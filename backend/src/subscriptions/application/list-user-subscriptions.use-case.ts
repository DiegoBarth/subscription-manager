import { Injectable } from '@nestjs/common';
import { SubscriptionsRepository } from '../infrastructure/repositories';
import { ListUserSubscriptionsParams } from './interfaces/list-user-subscriptions-params.interface';

@Injectable()
export class ListUserSubscriptionsUseCase {

  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository
  ) { }

  async execute(params: ListUserSubscriptionsParams) {

    const {
      customerId,
      page,
      limit,
      sortBy = 'created_at',
      sortOrder = 'DESC',
      status
    } = params;

    const skip = (page - 1) * limit;
    const take = limit;

    return this.subscriptionsRepo.findByCustomer({
      customerId,
      skip,
      take,
      sortBy,
      sortOrder,
      status
    });

  }

}