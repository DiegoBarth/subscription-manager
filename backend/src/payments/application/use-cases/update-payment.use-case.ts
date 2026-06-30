import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PaymentsRepository } from '../../infrastructure/repositories';
import { UpdatePaymentDto } from '../../adapters/dto';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';

@Injectable()
export class UpdatePaymentUseCase {

  constructor(
    private readonly paymentsRepo: PaymentsRepository,
  ) { }

  async execute(id: number, dto: UpdatePaymentDto) {

    const payment = await this.paymentsRepo.findById(id);

    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }

    if (payment.status === PaymentStatus.PAID) {
      throw new BadRequestException(
        'Paid payments cannot be updated',
      );
    }

    if (payment.status === PaymentStatus.REFUNDED) {
      throw new BadRequestException(
        'Refunded payments cannot be updated',
      );
    }

    return this.paymentsRepo.update(id, {
      amount: dto.amount,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
    });
  }
}