import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from 'src/subscriptions/adapters/dto';
import { FindSubscriptionsParams } from 'src/subscriptions/domain/interfaces/find-subscriptions-params.interface';

@Injectable()
export class SubscriptionsRepository {

  constructor(private readonly prisma: PrismaService) { }

  create(data: CreateSubscriptionDto) {
    return this.prisma.subscription.create({
      data: {
        customer_id: data.customerId,
        plan_id: data.planId,
        start_date: new Date(data.startDate),
        end_date: new Date(data.endDate),
        status: data.status ?? 'active'
      }
    });
  }

  update(id: number, data: UpdateSubscriptionDto) {
    const prismaData: any = { ...data };

    if (prismaData.planId) {
      prismaData.plan_id = prismaData.planId;
      delete prismaData.planId;
    }

    if (prismaData.endDate) {
      prismaData.end_date = new Date(prismaData.endDate);
      delete prismaData.endDate;
    }

    return this.prisma.subscription.update({
      where: { id },
      data: prismaData
    });
  }

  findById(id: number) {
    return this.prisma.subscription.findUnique({
      where: { id }
    });
  }

  findActiveByCustomer(customerId: number) {
    return this.prisma.subscription.findFirst({
      where: {
        customer_id: customerId,
        status: 'active',
        deleted_at: null
      }
    });
  }

  async findByCustomer(params: {
    customerId: number
    skip: number
    take: number
    sortBy: string
    sortOrder: 'ASC' | 'DESC'
    status?: string
  }) {

    const { customerId, skip, take, sortBy, sortOrder, status } = params;

    return this.prisma.subscription.findMany({
      where: {
        customer_id: customerId,
        ...(status && { status })
      },
      skip,
      take,
      orderBy: {
        [sortBy]: sortOrder.toLowerCase()
      }
    });

  }

  findAll(params?: FindSubscriptionsParams) {

    const {
      skip,
      take,
      customerId,
      planId,
      status,
      search,
      sortBy = 'created_at',
      sortOrder = 'DESC',
      filters = {}
    } = params || {};

    const where: any = {
      deleted_at: null,
      ...filters
    };

    if (customerId) where.customer_id = customerId;
    if (planId) where.plan_id = planId;
    if (status) where.status = status;

    if (search) {
      where.OR = [
        { status: { contains: search, mode: 'insensitive' } }
      ];
    }

    return this.prisma.subscription.findMany({
      skip,
      take,
      where,
      orderBy: {
        [sortBy]: sortOrder.toLowerCase()
      }
    });

  }

}