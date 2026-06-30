import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PaymentsRepository } from '../../infrastructure/repositories';

import { PaymentStatus } from '../../domain/enums/payment-status.enum';

import { MarkPaymentAsPaidDto } from '../../adapters/dto';

import { BillingService } from 'src/billing/application/services/billing.service';

@Injectable()
export class MarkPaymentAsPaidUseCase {
  constructor(
    private readonly paymentsRepo: PaymentsRepository,
    private readonly billingService: BillingService,
  ) { }

  async execute(
    id: number,
    dto: MarkPaymentAsPaidDto,
  ) {
    const payment =
      await this.paymentsRepo.findById(id);

    if (!payment) {
      throw new NotFoundException(
        `Payment with id ${id} not found`,
      );
    }

    switch (payment.status) {
      case PaymentStatus.PAID:
        throw new BadRequestException(
          'Payment already paid',
        );

      case PaymentStatus.REFUNDED:
        throw new BadRequestException(
          'Refunded payment cannot be marked as paid',
        );

      case PaymentStatus.FAILED:
        throw new BadRequestException(
          'Failed payment cannot be marked as paid',
        );
    }

    const updated =
      await this.paymentsRepo.update(id, {
        status: PaymentStatus.PAID,
        paidAt: new Date(),
        paymentMethod: dto.paymentMethod,
      });

    await this.billingService.onPaymentPaid(updated);

    return updated;
  }
}