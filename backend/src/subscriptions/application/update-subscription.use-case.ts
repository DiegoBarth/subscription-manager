import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionsRepository } from '../infrastructure/repositories';
import { UpdateSubscriptionDto } from '../adapters/dto';

@Injectable()
export class UpdateSubscriptionUseCase {

  constructor(private readonly subscriptionsRepo: SubscriptionsRepository) { }

  async execute(subscriptionId: number, data: UpdateSubscriptionDto) {

    const existingSubscription = await this.subscriptionsRepo.findById(subscriptionId);

    if (!existingSubscription) {
      throw new NotFoundException(`Subscription with id ${subscriptionId} not found`);
    }

    const updateData = { ...data };

    return this.subscriptionsRepo.update(subscriptionId, updateData);

  }

}