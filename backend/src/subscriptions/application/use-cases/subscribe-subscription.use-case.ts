import { Injectable, NotFoundException } from "@nestjs/common";
import { CustomersRepository } from "src/customer/infrastructure/repositories";
import { SubscriptionService } from "../services/subscription.service";
import { SubscribeSubscriptionDto } from "src/subscriptions/adapters/dto";

@Injectable()
export class SubscribeSubscriptionUseCase {

  constructor(
    private readonly customersRepo: CustomersRepository,
    private readonly subscriptionService: SubscriptionService
  ) { }

  async execute(userId: number, dto: SubscribeSubscriptionDto) {
    const customer = await this.customersRepo.findActiveByUserId(userId);

    if (!customer) {
      throw new NotFoundException(
        `Customer not found for user ${userId}`,
      );
    }

    return this.subscriptionService.create(
      customer.id,
      dto.planId,
    );
  }

}