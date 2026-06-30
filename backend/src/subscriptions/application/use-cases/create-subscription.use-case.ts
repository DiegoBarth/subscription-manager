import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { SubscriptionsRepository } from '../../infrastructure/repositories';
import { CustomersRepository } from 'src/customer/infrastructure/repositories';
import { PlansRepository } from 'src/plans/infrastructure/repositories';

import { CreateSubscriptionDto } from '../../adapters/dto';

import { SubscriptionStatus } from '../../domain/enums';

import { BillingService } from 'src/billing/application/services/billing.service';

@Injectable()
export class CreateSubscriptionUseCase {
  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly customersRepo: CustomersRepository,
    private readonly plansRepo: PlansRepository,
    private readonly billingService: BillingService,
  ) {}

  async execute(data: CreateSubscriptionDto) {
    const customer = await this.customersRepo.findById(data.customerId);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const plan = await this.plansRepo.findById(data.planId);

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    const existingSubscription =
      await this.subscriptionsRepo.findActiveByCustomer(
        data.customerId,
      );

    if (existingSubscription) {
      throw new ConflictException(
        'Customer already has an active subscription',
      );
    }

    const startDate = new Date();

    const endDate = new Date();

    endDate.setMonth(
      endDate.getMonth() + plan.duration_months,
    );

    const subscription =
      await this.subscriptionsRepo.create({
        customerId: data.customerId,
        planId: data.planId,
        startDate,
        endDate,
        status: SubscriptionStatus.ACTIVE,
        contractedPrice: Math.round(plan.price * 100),
      });

    await this.billingService.createSubscriptionPayment(
      subscription.id,
      subscription.contracted_price,
      endDate,
    );

    return subscription;
  }
}