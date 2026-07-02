import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { UserRole } from '@prisma/client';
import { CustomersRepository } from 'src/customer/infrastructure/repositories';
import { PaymentsRepository } from '../../infrastructure/repositories';

@Injectable()
export class PaymentAuthorizationService {
  constructor(
    private readonly customersRepo: CustomersRepository,
    private readonly paymentsRepo: PaymentsRepository,
  ) { }

  async resolveCustomer(user: any) {
    const customer = await this.customersRepo.findByUserId(user.id);

    if (!customer) {
      throw new ForbiddenException('Customer not found for user');
    }

    return customer;
  }

  async canAccessPayment(user: any, paymentId: number) {
    const payment = await this.paymentsRepo.findById(paymentId);

    if (!payment) {
      return null;
    }

    if (user.role === UserRole.admin) {
      return payment;
    }

    const customer = await this.resolveCustomer(user);

    if (payment.subscription.customer_id !== customer.id) {
      throw new ForbiddenException('You cannot access this payment');
    }

    return payment;
  }

  async buildFilters(user: any, filters: any = {}) {
    if (user.role === UserRole.admin) {
      return filters;
    }

    const customer = await this.resolveCustomer(user);

    return {
      ...filters,
      customerId: customer.id,
    };
  }

}