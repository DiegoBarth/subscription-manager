import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from '../../infrastructure/repositories';
import { CreatePaymentDto } from '../../adapters/dto';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';

@Injectable()
export class CreatePaymentUseCase {
  constructor(private readonly paymentsRepo: PaymentsRepository) {}

  async execute(data: CreatePaymentDto) {
    return this.paymentsRepo.create({
      subscriptionId: data.subscriptionId,
      amount: data.amount,
      dueDate: new Date(data.dueDate),
      status: PaymentStatus.PENDING,
    });
  }
}