import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionsRepository } from '../infrastructure/repositories';

@Injectable()
export class FindSubscriptionUseCase {

  constructor(private readonly subscriptionsRepo: SubscriptionsRepository) { }

  async execute(id: number) {
    const subscription = await this.subscriptionsRepo.findById(id);

    if(!subscription) {
      throw new NotFoundException(`Subscription with id ${id} not found`);
    }

    return subscription;
  }

}