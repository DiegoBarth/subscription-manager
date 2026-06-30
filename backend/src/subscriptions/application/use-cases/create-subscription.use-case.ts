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
import { PaymentStatus } from 'src/payments/domain/enums/payment-status.enum';
import { PaymentsRepository } from 'src/payments/infrastructure/repositories';

@Injectable()
export class CreateSubscriptionUseCase {
  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly customersRepo: CustomersRepository,
    private readonly plansRepo: PlansRepository,
    private readonly paymentsRepo: PaymentsRepository
  ) { }

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
      await this.subscriptionsRepo.findActiveByCustomer(data.customerId);

    if (existingSubscription) {
      throw new ConflictException(
        'Customer already has an active subscription',
      );
    }

    const startDate = new Date();

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.duration_months);

    const subscription = await this.subscriptionsRepo.create({
      customerId: data.customerId,
      planId: data.planId,
      startDate,
      endDate,
      status: SubscriptionStatus.ACTIVE,
      contractedPrice: plan.price,
    });

    const existingPayment =
      await this.paymentsRepo.findPendingBySubscriptionId(subscription.id);

    if (existingPayment) {
      throw new ConflictException('Subscription already has a pending payment');
    }

    await this.paymentsRepo.create({
      subscriptionId: subscription.id,
      amount: plan.price,
      dueDate: endDate,
      status: PaymentStatus.PENDING,
    });

    return subscription;
  }
}