import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { SubscriptionsRepository } from '../infrastructure/repositories';
import { CustomersRepository } from 'src/customer/infrastructure/repositories';
import { PlansRepository } from 'src/plans/infrastructure/repositories';
import { SubscribeSubscriptionDto } from '../adapters/dto';
import { SubscriptionStatus } from '../domain/enums';

@Injectable()
export class SubscribeSubscriptionUseCase {

  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly customersRepo: CustomersRepository,
    private readonly plansRepo: PlansRepository,
  ) { }

  async execute(customerId: number, dto: SubscribeSubscriptionDto) {

    const customer = await this.customersRepo.findById(customerId);

    if (!customer) {
      throw new NotFoundException(`Customer with id ${customerId} not found`);
    }

    const plan = await this.plansRepo.findById(dto.planId);

    if (!plan) {
      throw new NotFoundException(`Plan with id ${dto.planId} not found`);
    }

    const activeSubscription =
      await this.subscriptionsRepo.findActiveByCustomer(customerId);

    if (activeSubscription) {
      throw new ConflictException('Customer already has an active subscription');
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(startDate.getFullYear() + 1);

    return this.subscriptionsRepo.create({
      customerId,
      planId: dto.planId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: SubscriptionStatus.ACTIVE
    });
  }
}