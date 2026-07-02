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

    if (payment.status !== PaymentStatus.PAID) {
      throw new BadRequestException(
        `Only paid payments can be refunded`,
      );
    }

    return this.paymentsRepo.update(id, {
      status: PaymentStatus.REFUNDED,
      refundedAt: new Date(),
    });
  }
}