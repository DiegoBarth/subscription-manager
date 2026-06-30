import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentsRepository } from '../../infrastructure/repositories';

@Injectable()
export class FindPaymentUseCase {
  constructor(private readonly paymentsRepo: PaymentsRepository) {}

  async execute(id: number) {
    const payment = await this.paymentsRepo.findById(id);

    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }

    return payment;
  }
}