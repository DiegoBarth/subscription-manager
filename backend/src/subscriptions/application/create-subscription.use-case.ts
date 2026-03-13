import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { SubscriptionsRepository } from '../infrastructure/repositories';
import { CustomersRepository } from 'src/customer/infrastructure/repositories';
import { PlansRepository } from 'src/plans/infrastructure/repositories';
import { CreateSubscriptionDto } from '../adapters/dto';

@Injectable()
export class CreateSubscriptionUseCase {

  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly customersRepo: CustomersRepository,
    private readonly plansRepo: PlansRepository,
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

    const existingSubscription = await this.subscriptionsRepo.findActiveByCustomer(data.customerId);

    if (existingSubscription) {
      throw new ConflictException('Customer already has an active subscription');
    }

    return this.subscriptionsRepo.create({
      ...data,
      startDate: data.startDate ?? new Date(),
    });

  }

}