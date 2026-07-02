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

    if (prismaData.refundedAt !== undefined) {
      prismaData.refunded_at = prismaData.refundedAt;
      delete prismaData.refundedAt;
    }

    return this.prisma.payment.update({
      where: { id },
      data: prismaData,
    });
  }

  findById(id: number) {
    return this.prisma.payment.findUnique({
      where: { id },
      include: {
        subscription: {
          select: {
            id: true,
            customer_id: true,
          },
        },
      },
    });
  }

  findAll(params: FindPaymentsParams) {
    const {
      skip,
      take,
      search,
      sortBy = 'created_at',
      sortOrder = 'DESC',
      filters = {},
    } = params;

    const where: any = {
      deleted_at: null,
    };

    // ✔ customer via subscription
    if (filters.customerId) {
      where.subscription = {
        customer_id: filters.customerId,
      };
    }

    // ✔ subscription direta
    if (filters.subscriptionId) {
      where.subscription_id = filters.subscriptionId;
    }

    // ✔ status centralizado
    if (filters.status) {
      where.status = filters.status;
    }

    // ✔ search só em campos válidos
    if (search) {
      where.OR = [
        {
          payment_method: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    return this.prisma.payment.findMany({
      skip,
      take,
      where,
      include: {
        subscription: {
          select: {
            id: true,
            customer_id: true,
          },
        },
      },
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

  findBySubscriptionId(subscriptionId: number) {
    return this.prisma.payment.findMany({
      where: {
        subscription_id: subscriptionId,
        deleted_at: null,
      },
      orderBy: {
        due_date: 'desc',
      },
    });
  }
}