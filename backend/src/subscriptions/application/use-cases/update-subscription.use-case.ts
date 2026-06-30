import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionsRepository } from '../../infrastructure/repositories';
import { UpdateSubscriptionDto } from '../../adapters/dto';
import { SubscriptionStatus } from '../../domain/enums';

@Injectable()
export class UpdateSubscriptionUseCase {

  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
  ) { }

  async execute(subscriptionId: number, data: UpdateSubscriptionDto) {

    const existingSubscription = await this.subscriptionsRepo.findById(subscriptionId);

    if (!existingSubscription) {
      throw new NotFoundException(
        `Subscription with id ${subscriptionId} not found`,
      );
    }

    const updateData = {
      planId: data.planId,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      status: data.status as SubscriptionStatus | undefined,
    };

    return this.subscriptionsRepo.update(subscriptionId, updateData);
  }
}