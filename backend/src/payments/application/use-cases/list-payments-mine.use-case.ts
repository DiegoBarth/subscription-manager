import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from '../../infrastructure/repositories';
import { PaymentAuthorizationService } from '../services/payment-authorization.service';

@Injectable()
export class ListPaymentsMineUseCase {
  constructor(
    private readonly paymentsRepo: PaymentsRepository,
    private readonly auth: PaymentAuthorizationService,
  ) { }

  async execute(params: any) {
    const {
      user,
      page,
      limit,
      status,
    } = params;

    const filters = await this.auth.buildFilters(user, {
      status,
    });

    return this.paymentsRepo.findAll({
      skip: (page - 1) * limit,
      take: limit,
      filters,
    });
  }
}