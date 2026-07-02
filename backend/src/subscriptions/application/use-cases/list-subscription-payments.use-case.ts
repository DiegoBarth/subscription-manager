import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { UserRole } from '@prisma/client';

import { SubscriptionsRepository } from '../../infrastructure/repositories';
import { PaymentsRepository } from 'src/payments/infrastructure/repositories';
import { CustomersRepository } from 'src/customer/infrastructure/repositories';

@Injectable()
export class ListSubscriptionPaymentsUseCase {
  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly paymentsRepo: PaymentsRepository,
    private readonly customersRepo: CustomersRepository,
  ) { }

  async execute(subscriptionId: number, user: any) {
    const subscription = await this.subscriptionsRepo.findById(subscriptionId);

    if (!subscription) {
      throw new NotFoundException(`Subscription with id ${subscriptionId} not found`);
    }

    if (user.role !== UserRole.admin) {
      const customer = await this.customersRepo.findActiveByUserId(user.id);

      if (!customer) {
        throw new NotFoundException(`Customer for user ${user.id} not found`);
      }

      if (subscription.customer_id !== customer.id) {
        throw new ForbiddenException('You cannot access this subscription');
      }
    }

    return this.paymentsRepo.findBySubscriptionId(subscriptionId);
  }
}