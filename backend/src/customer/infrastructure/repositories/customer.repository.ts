import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/customer/adapters/dto';
import { FindCustomersParams } from 'src/customer/domain/interfaces/find-customers-params.interface';
import { CustomerStatus } from '@prisma/client';

@Injectable()
export class CustomersRepository {

  constructor(private readonly prisma: PrismaService) { }

  create(data: CreateCustomerDto & { userId: number }) {
    return this.prisma.customer.create({
      data: {
        user_id: data.userId,
        name: data.name,
        email: data.email,
        phone: data.phone
      }
    });
  }

  update(id: number, data: UpdateCustomerDto) {
    const prismaData: any = { ...data };

    return this.prisma.customer.update({
      where: { id },
      data: prismaData
    });
  }

  findById(id: number) {
    return this.prisma.customer.findUnique({
      where: { id }
    });
  }

  findAll(params?: FindCustomersParams) {
    const {
      skip,
      take,
      name,
      email,
      phone,
      userId,
      search,
      sortBy = 'created_at',
      sortOrder = 'DESC',
      filters = {}
    } = params || {};

    const where: any = { ...filters };

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } }
      ];
    }

    if (name) where.name = { contains: name };
    if (email) where.email = { contains: email };
    if (phone) where.phone = { contains: phone };
    if (userId) where.user_id = userId;

    return this.prisma.customer.findMany({
      skip,
      take,
      where,
      orderBy: {
        [sortBy]: sortOrder.toLowerCase()
      }
    });
  }

  findByEmail(email: string) {
    return this.prisma.customer.findFirst({
      where: { email }
    });
  }

  async hasActiveSubscription(customerId: number) {
    const count = await this.prisma.subscription.count({
      where: {
        customer_id: customerId,
        status: 'active',
        deleted_at: null,
      },
    });

    return count > 0;
  }

  async hasPendingPayments(customerId: number) {
    const count = await this.prisma.payment.count({
      where: {
        subscription: {
          customer_id: customerId,
        },
        status: 'pending',
      },
    });

    return count > 0;
  }

  async softDelete(id: number) {
    return this.prisma.customer.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  async updateStatus(id: number, status: CustomerStatus) {
    return this.prisma.customer.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.customer.findFirst({
      where: {
        user_id: userId,
        deleted_at: null,
      },
    });
  }

}