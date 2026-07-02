import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PaymentsRepository } from '../../infrastructure/repositories';
import { PaymentStatus } from '@prisma/client';
import { UpdatePaymentDto } from '../../adapters/dto';

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

    if (payment.status !== PaymentStatus.pending) {
      throw new BadRequestException(
        `Only pending payments can be updated`,
      );
    }

    const hasChanges =
      dto.amount !== undefined ||
      dto.dueDate !== undefined;

    if (!hasChanges) {
      throw new BadRequestException(
        `At least one field must be provided`,
      );
    }

    return this.paymentsRepo.update(id, {
      amount: dto.amount,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
    });
  }
}