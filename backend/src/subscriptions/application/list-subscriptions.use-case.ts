import { Injectable } from '@nestjs/common';
import { SubscriptionsRepository } from '../infrastructure/repositories';
import { ListSubscriptionsParams } from './interfaces/list-subscriptions-params.interface';

@Injectable()
export class ListSubscriptionsUseCase {

  constructor(private readonly subscriptionsRepo: SubscriptionsRepository) { }

  async execute(params: ListSubscriptionsParams) {

    const {
      page,
      limit,
      search,
      sortBy = 'created_at',
      sortOrder = 'DESC',
      filters = {},
    } = params;

    const skip = (page - 1) * limit;
    const take = limit;

    return this.subscriptionsRepo.findAll({
      skip,
      take,
      search,
      sortBy,
      sortOrder,
      filters
    });

  }

}