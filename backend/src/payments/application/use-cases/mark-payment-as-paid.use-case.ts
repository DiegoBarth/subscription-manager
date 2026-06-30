import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PaymentsRepository } from '../../infrastructure/repositories';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';
import { MarkPaymentAsPaidDto } from '../../adapters/dto';

@Injectable()
export class MarkPaymentAsPaidUseCase {

  constructor(
    private readonly paymentsRepo: PaymentsRepository,
  ) { }

  async execute(id: number, dto: MarkPaymentAsPaidDto) {

    const payment = await this.paymentsRepo.findById(id);

    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }

    switch (payment.status) {
      case PaymentStatus.PAID:
        throw new BadRequestException('Payment already paid');

      case PaymentStatus.REFUNDED:
        throw new BadRequestException(
          'Refunded payment cannot be marked as paid',
        );

      case PaymentStatus.FAILED:
        throw new BadRequestException(
          'Failed payment cannot be marked as paid',
        );
    }

    return this.paymentsRepo.update(id, {
      paymentMethod: dto.paymentMethod,
      paidAt: new Date(),
      status: PaymentStatus.PAID,
    });
  }

}