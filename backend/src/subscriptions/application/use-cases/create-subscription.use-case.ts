import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from '../../adapters/dto';
import { SubscriptionService } from '../services/subscription.service';

@Injectable()
export class CreateSubscriptionUseCase {
  constructor(
    private readonly subscriptionService: SubscriptionService,
  ) { }

  execute(dto: CreateSubscriptionDto) {
    return this.subscriptionService.create(
      dto.customerId,
      dto.planId,
    );
  }
}