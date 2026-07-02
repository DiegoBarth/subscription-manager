import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SubscriptionsRepository } from '../../infrastructure/repositories';

import { BillingService } from 'src/billing/application/services/billing.service';
import { SubscriptionStatus } from '@prisma/client';

@Injectable()
export class RenewSubscriptionUseCase {
  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly billingService: BillingService,
  ) { }

  async execute(subscriptionId: number) {
    const subscription = await this.subscriptionsRepo.findById(subscriptionId);

    if (!subscription) {
      throw new NotFoundException(`Subscription with id ${subscriptionId} not found`);
    }

    if (
      subscription.status !== SubscriptionStatus.active &&
      subscription.status !== SubscriptionStatus.expired
    ) {
      throw new ConflictException(
        `Subscription with status ${subscription.status} cannot be renewed`,
      );
    }

    await this.billingService.renewSubscription(subscription);

    return this.subscriptionsRepo.findById(subscription.id);
  }
}