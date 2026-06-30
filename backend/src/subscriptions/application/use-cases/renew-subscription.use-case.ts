import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SubscriptionsRepository } from '../../infrastructure/repositories';

import { BillingService } from 'src/billing/application/services/billing.service';

@Injectable()
export class RenewSubscriptionUseCase {
  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly billingService: BillingService,
  ) { }

  async execute(subscriptionId: number) {
    const subscription =
      await this.subscriptionsRepo.findById(subscriptionId);

    if (!subscription) {
      throw new NotFoundException(
        `Subscription with id ${subscriptionId} not found`,
      );
    }

    await this.billingService.renewSubscription(
      subscription.id,
    );

    return this.subscriptionsRepo.findById(subscription.id);
  }
}