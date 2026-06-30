import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindPaymentsParams } from 'src/payments/domain/interface/find-payments-params.interface';
import { PaymentStatus } from 'src/payments/domain/enums/payment-status.enum';
import { CreatePaymentData } from 'src/payments/application/interfaces/create-payment-data.interface';
import { UpdatePaymentData } from 'src/payments/application/interfaces/update-payment-data.interface';

@Injectable()
export class PaymentsRepository {
  constructor(private readonly prisma: PrismaService) { }

  create(data: CreatePaymentData) {
    return this.prisma.payment.create({
      data: {
        subscription_id: data.subscriptionId,
        amount: data.amount,
        due_date: new Date(data.dueDate),
        status: data.status,
      },
    });
  }

  update(id: number, data: UpdatePaymentData) {
    const prismaData: any = { ...data };

    if (prismaData.paymentMethod !== undefined) {
      prismaData.payment_method = prismaData.paymentMethod;
      delete prismaData.paymentMethod;
    }

    if (prismaData.dueDate !== undefined) {
      prismaData.due_date = new Date(prismaData.dueDate);
      delete prismaData.dueDate;
    }

    if (prismaData.paidAt !== undefined) {
      prismaData.paid_at = prismaData.paidAt;
      delete prismaData.paidAt;
    }

    return this.prisma.payment.update({
      where: { id },
      data: prismaData,
    });
  }

  findById(id: number) {
    return this.prisma.payment.findUnique({
      where: { id },
    });
  }

  findAll(params: FindPaymentsParams) {
    const {
      skip,
      take,
      subscriptionId,
      status,
      search,
      sortBy = 'created_at',
      sortOrder = 'DESC',
      filters = {},
    } = params;

    const where: any = {
      deleted_at: null,
      ...filters,
    };

    if (subscriptionId) {
      where.subscription_id = subscriptionId;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { status: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.payment.findMany({
      skip,
      take,
      where,
      orderBy: {
        [sortBy]: sortOrder.toLowerCase(),
      },
    });
  }

  findPendingBySubscriptionId(subscriptionId: number) {
    return this.prisma.payment.findFirst({
      where: {
        subscription_id: subscriptionId,
        status: PaymentStatus.PENDING,
        deleted_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}