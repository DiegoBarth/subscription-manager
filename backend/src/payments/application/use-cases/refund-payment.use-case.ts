import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PaymentsRepository } from '../../infrastructure/repositories';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';

@Injectable()
export class RefundPaymentUseCase {

  constructor(
    private readonly paymentsRepo: PaymentsRepository,
  ) { }

  async execute(id: number) {

    const payment = await this.paymentsRepo.findById(id);

    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }

    switch (payment.status) {
      case PaymentStatus.PENDING:
        throw new BadRequestException(
          'Pending payment cannot be refunded',
        );

      case PaymentStatus.FAILED:
        throw new BadRequestException(
          'Failed payment cannot be refunded',
        );

      case PaymentStatus.REFUNDED:
        throw new BadRequestException(
          'Payment already refunded',
        );
    }

    return this.paymentsRepo.update(id, {
      status: PaymentStatus.REFUNDED,
      refundedAt: new Date()
    });
  }

}