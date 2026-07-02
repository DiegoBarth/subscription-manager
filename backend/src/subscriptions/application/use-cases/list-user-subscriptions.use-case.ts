import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionsRepository } from '../../infrastructure/repositories';
import { ListUserSubscriptionsParams } from '../interfaces/list-user-subscriptions-params.interface';
import { CustomersRepository } from 'src/customer/infrastructure/repositories';

@Injectable()
export class ListUserSubscriptionsUseCase {
  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly customersRepo: CustomersRepository,
  ) { }

  async execute(params: ListUserSubscriptionsParams) {
    const {
      userId,
      page,
      limit,
      sortBy = 'created_at',
      sortOrder = 'DESC',
      status,
    } = params;

    const customer = await this.customersRepo.findActiveByUserId(userId);

    if (!customer) {
      throw new NotFoundException(
        `Customer not found for user ${userId}`,
      );
    }

    return this.subscriptionsRepo.findByCustomer({
      customerId: customer.id,
      skip: (page - 1) * limit,
      take: limit,
      sortBy,
      sortOrder,
      status,
    });
  }
}