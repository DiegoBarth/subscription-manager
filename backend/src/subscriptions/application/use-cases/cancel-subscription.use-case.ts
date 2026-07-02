import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { SubscriptionsRepository } from '../../infrastructure/repositories';
import { SubscriptionStatus } from '@prisma/client';
import { CustomersRepository } from 'src/customer/infrastructure/repositories';

@Injectable()
export class CancelSubscriptionUseCase {

  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly customersRepo: CustomersRepository
  ) { }

  async execute(
    subscriptionId: number,
    userId: number
  ) {

    const subscription = await this.subscriptionsRepo.findById(subscriptionId);

    if (!subscription) {
      throw new NotFoundException(`Subscription with id ${subscriptionId} not found`);
    }

    const customer = await this.customersRepo.findActiveByUserId(userId);

    if (!customer) {
      throw new NotFoundException(
        `Customer not found for user ${userId}`,
      );
    }

    if (subscription.customer_id !== customer.id) {
      throw new ForbiddenException(
        'You cannot cancel this subscription'
      );
    }

    if (subscription.status === SubscriptionStatus.canceled) {
      return subscription;
    }

    return this.subscriptionsRepo.update(subscriptionId, {
      status: SubscriptionStatus.canceled
    });
  }
}