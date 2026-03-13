import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { SubscriptionsRepository } from '../infrastructure/repositories';
import { CancelSubscriptionDto } from '../adapters/dto';
import { SubscriptionStatus } from '../domain/enums';

@Injectable()
export class CancelSubscriptionUseCase {

  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository
  ) { }

  async execute(
    subscriptionId: number,
    customerId: number,
    dto: CancelSubscriptionDto
  ) {

    const subscription = await this.subscriptionsRepo.findById(subscriptionId);

    if (!subscription) {
      throw new NotFoundException(`Subscription with id ${subscriptionId} not found`);
    }

    if (subscription.customer_id !== customerId) {
      throw new ForbiddenException(
        'You cannot cancel this subscription'
      );
    }

    if (subscription.status === SubscriptionStatus.CANCELED) {
      return subscription;
    }

    return this.subscriptionsRepo.update(subscriptionId, {
      status: SubscriptionStatus.CANCELED
    });
  }
}