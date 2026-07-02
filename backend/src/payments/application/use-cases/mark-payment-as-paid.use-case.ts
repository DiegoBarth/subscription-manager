import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PaymentsRepository } from '../../infrastructure/repositories';
import { PaymentStatus } from '@prisma/client';
import { MarkPaymentAsPaidDto } from '../../adapters/dto';
import { BillingService } from 'src/billing/application/services/billing.service';

@Injectable()
export class MarkPaymentAsPaidUseCase {
  constructor(
    private readonly paymentsRepo: PaymentsRepository,
    private readonly billingService: BillingService,
  ) { }

  async execute(id: number, dto: MarkPaymentAsPaidDto) {
    const payment = await this.paymentsRepo.findById(id);

    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }

    if (payment.status === PaymentStatus.paid) {
      return payment;
    }

    if (
      payment.status === PaymentStatus.refunded ||
      payment.status === PaymentStatus.failed
    ) {
      throw new BadRequestException(
        `Payment in status ${payment.status} cannot be processed`,
      );
    }

    await this.paymentsRepo.update(id, {
      status: PaymentStatus.paid,
      paidAt: new Date(),
      paymentMethod: dto.paymentMethod,
    });

    await this.billingService.onPaymentPaid({
      ...payment,
      status: PaymentStatus.paid,
    });

    return this.paymentsRepo.findById(id);
  }
}