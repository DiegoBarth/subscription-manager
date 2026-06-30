import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';

import { SubscriptionsRepository } from '../../infrastructure/repositories';
import { PlansRepository } from 'src/plans/infrastructure/repositories';
import { UpdateSubscriptionDto } from '../../adapters/dto';
import { SubscriptionStatus } from '../../domain/enums';

@Injectable()
export class UpdateSubscriptionUseCase {
  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly plansRepo: PlansRepository,
  ) { }

  async execute(
    subscriptionId: number,
    dto: UpdateSubscriptionDto,
  ) {
    const subscription =
      await this.subscriptionsRepo.findById(subscriptionId);

    if (!subscription) {
      throw new NotFoundException(
        `Subscription with id ${subscriptionId} not found`,
      );
    }

    if (subscription.status === SubscriptionStatus.CANCELED) {
      throw new BadRequestException(
        'Canceled subscriptions cannot be updated',
      );
    }

    const updateData: any = {
      endDate: dto.endDate
        ? new Date(dto.endDate)
        : undefined,
      status: dto.status as SubscriptionStatus | undefined,
    };

    if (dto.planId) {
      const plan = await this.plansRepo.findById(dto.planId);

      if (!plan) {
        throw new NotFoundException('Plan not found');
      }

      updateData.planId = dto.planId;
      updateData.contractedPrice = plan.price;
    }

    return this.subscriptionsRepo.update(
      subscriptionId,
      updateData,
    );
  }
}