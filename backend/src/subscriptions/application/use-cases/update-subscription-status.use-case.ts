import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';

import { SubscriptionsRepository } from '../../infrastructure/repositories';
import { SubscriptionStatus } from '@prisma/client';
import { UpdateSubscriptionStatusDto } from '../../adapters/dto';

@Injectable()
export class UpdateSubscriptionStatusUseCase {
  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
  ) { }

  async execute(
    subscriptionId: number,
    dto: UpdateSubscriptionStatusDto,
  ) {
    const subscription =
      await this.subscriptionsRepo.findById(subscriptionId);

    if (!subscription) {
      throw new NotFoundException(
        `Subscription with id ${subscriptionId} not found`,
      );
    }

    if (subscription.status === SubscriptionStatus.canceled) {
      throw new BadRequestException(
        'Canceled subscriptions cannot be modified',
      );
    }

    if (subscription.status === dto.status) {
      throw new ConflictException(
        'Subscription already has this status',
      );
    }

    this.validateTransition(subscription.status, dto.status);

    return this.subscriptionsRepo.update(subscriptionId, {
      status: dto.status,
    });
  }

  private validateTransition(
    current: SubscriptionStatus,
    next: SubscriptionStatus,
  ) {
    const allowed: Record<SubscriptionStatus, SubscriptionStatus[]> =
    {
      active: ['expired', 'canceled'],
      expired: ['active'],
      pending: ['active', 'canceled'],
      canceled: [],
    };

    if (!allowed[current]?.includes(next)) {
      throw new BadRequestException(
        `Cannot change status from ${current} to ${next}`,
      );
    }
  }
}