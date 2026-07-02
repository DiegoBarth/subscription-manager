import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException
} from '@nestjs/common';

import { SubscriptionsRepository } from '../../infrastructure/repositories';
import { PlansRepository } from 'src/plans/infrastructure/repositories';
import { UpdateSubscriptionDto } from '../../adapters/dto';
import { SubscriptionStatus } from '@prisma/client';

@Injectable()
export class UpdateSubscriptionUseCase {
  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly plansRepo: PlansRepository,
  ) { }

  async execute(subscriptionId: number, dto: UpdateSubscriptionDto) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    const subscription = await this.subscriptionsRepo.findById(subscriptionId);

    if (!subscription) {
      throw new NotFoundException(`Subscription with id ${subscriptionId} not found`);
    }

    if (subscription.status === SubscriptionStatus.canceled) {
      throw new BadRequestException('Canceled subscriptions cannot be updated');
    }

    if (dto.endDate) {
      const endDate = new Date(dto.endDate);

      if (endDate <= subscription.start_date) {
        throw new BadRequestException('End date must be after start date');
      }
    }

    let contractedPrice: number | undefined;

    if (dto.planId !== undefined) {
      if (dto.planId === subscription.plan_id) {
        throw new ConflictException('Subscription already uses this plan');
      }

      const plan =
        await this.plansRepo.findActiveById(dto.planId);

      if (!plan) {
        throw new NotFoundException(`Active plan with id ${dto.planId} not found`);
      }

      contractedPrice = plan.price;
    }

    return this.subscriptionsRepo.update(subscriptionId, {
      planId: dto.planId,
      endDate: dto.endDate
        ? new Date(dto.endDate)
        : undefined,
      contractedPrice,
    });
  }
}