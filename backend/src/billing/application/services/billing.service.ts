import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PaymentsRepository } from 'src/payments/infrastructure/repositories';
import { PaymentStatus } from 'src/payments/domain/enums/payment-status.enum';

import { SubscriptionsRepository } from 'src/subscriptions/infrastructure/repositories';
import { SubscriptionStatus } from 'src/subscriptions/domain/enums';

import { PlansRepository } from 'src/plans/infrastructure/repositories';

@Injectable()
export class BillingService {
  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly plansRepo: PlansRepository,
    private readonly paymentsRepo: PaymentsRepository,
  ) { }

  async createSubscriptionPayment(
    subscriptionId: number,
    amount: number,
    dueDate: Date,
  ) {
    const pending =
      await this.paymentsRepo.findPendingBySubscriptionId(subscriptionId);

    if (pending) {
      throw new ConflictException(
        'Subscription already has a pending payment',
      );
    }

    return this.paymentsRepo.create({
      subscriptionId,
      amount,
      dueDate,
      status: PaymentStatus.PENDING,
    });
  }

  async onPaymentPaid(payment: any) {
    const subscription = await this.subscriptionsRepo.findById(
      payment.subscription_id,
    );

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    const plan = await this.plansRepo.findById(subscription.plan_id);

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    const now = new Date();

    const currentEndDate = new Date(subscription.end_date);

    const baseDate =
      currentEndDate > now
        ? currentEndDate
        : now;

    const newEndDate = new Date(baseDate);

    newEndDate.setMonth(
      newEndDate.getMonth() + plan.duration_months,
    );

    await this.subscriptionsRepo.update(subscription.id, {
      endDate: newEndDate,
      status: SubscriptionStatus.ACTIVE,
    });

    await this.createSubscriptionPayment(
      subscription.id,
      subscription.contracted_price,
      newEndDate,
    );
  }

  async renewSubscription(subscriptionId: number) {
    const subscription =
      await this.subscriptionsRepo.findById(subscriptionId);

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    const plan =
      await this.plansRepo.findById(subscription.plan_id);

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    const currentEndDate = new Date(subscription.end_date);

    const newEndDate = new Date(currentEndDate);

    newEndDate.setMonth(
      newEndDate.getMonth() + plan.duration_months,
    );

    await this.subscriptionsRepo.update(subscription.id, {
      endDate: newEndDate,
      contractedPrice: subscription.contracted_price,
      status: SubscriptionStatus.ACTIVE,
    });

    await this.createSubscriptionPayment(
      subscription.id,
      subscription.contracted_price,
      newEndDate,
    );
  }
}