import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionsRepository } from '../../infrastructure/repositories';
import { PlansRepository } from 'src/plans/infrastructure/repositories';
import { PaymentsRepository } from 'src/payments/infrastructure/repositories';
import { SubscriptionStatus } from '../../domain/enums';
import { PaymentStatus } from 'src/payments/domain/enums/payment-status.enum';

@Injectable()
export class RenewSubscriptionUseCase {

  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly plansRepo: PlansRepository,
    private readonly paymentsRepo: PaymentsRepository,
  ) { }

  async execute(subscriptionId: number) {

    const subscription = await this.subscriptionsRepo.findById(subscriptionId);

    if (!subscription) {
      throw new NotFoundException(`Subscription with id ${subscriptionId} not found`);
    }

    const plan = await this.plansRepo.findById(subscription.plan_id);

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    const currentEndDate = new Date(subscription.end_date);

    const newEndDate = new Date(currentEndDate);
    newEndDate.setMonth(newEndDate.getMonth() + plan.duration_months);

    const updatedSubscription = await this.subscriptionsRepo.update(subscriptionId, {
      endDate: newEndDate,
      contractedPrice: plan.price,
      status: SubscriptionStatus.ACTIVE,
    });

    await this.paymentsRepo.create({
      subscriptionId,
      amount: plan.price,
      dueDate: newEndDate,
      status: PaymentStatus.PENDING,
    });

    return updatedSubscription;
  }
}