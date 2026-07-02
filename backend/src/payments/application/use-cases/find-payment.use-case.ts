import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { PaymentsRepository } from '../../infrastructure/repositories';
import { PaymentAuthorizationService } from '../services/payment-authorization.service';

@Injectable()
export class FindPaymentUseCase {
  constructor(
    private readonly paymentsRepo: PaymentsRepository,
    private readonly auth: PaymentAuthorizationService,
  ) { }

  async execute(id: number, user: any) {
    const payment = await this.paymentsRepo.findById(id);

    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }

    const canAccess = await this.auth.canAccessPayment(user, id);

    if (!canAccess) {
      throw new ForbiddenException('You cannot access this payment');
    }

    return payment;
  }
}