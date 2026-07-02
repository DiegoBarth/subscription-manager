import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { BillingService } from "src/billing/application/services/billing.service";
import { CustomersRepository } from "src/customer/infrastructure/repositories";
import { PlansRepository } from "src/plans/infrastructure/repositories";
import { SubscriptionStatus } from "@prisma/client";
import { SubscriptionsRepository } from "src/subscriptions/infrastructure/repositories";

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly customersRepo: CustomersRepository,
    private readonly plansRepo: PlansRepository,
    private readonly billingService: BillingService,
  ) { }

  async create(customerId: number, planId: number) {
    const customer = await this.customersRepo.findActiveById(customerId);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const plan = await this.plansRepo.findActiveById(planId);

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    const activeSubscription = await this.subscriptionsRepo.findActiveByCustomer(
      customerId,
    );

    if (activeSubscription) {
      throw new ConflictException(
        'Customer already has an active subscription',
      );
    }

    const startDate = new Date();
    const endDate = this.calculateEndDate(startDate, plan.duration_months);

    const subscription =
      await this.subscriptionsRepo.create({
        customerId,
        planId,
        startDate,
        endDate,
        status: SubscriptionStatus.active,
        contractedPrice: plan.price,
      });

    await this.billingService.createSubscriptionPayment(
      subscription.id,
      subscription.contracted_price,
      endDate,
    );

    return subscription;
  }

  private calculateEndDate(startDate: Date, durationMonths: number): Date {
    const endDate = new Date(startDate);

    endDate.setMonth(
      endDate.getMonth() + durationMonths,
    );

    return endDate;
  }

}