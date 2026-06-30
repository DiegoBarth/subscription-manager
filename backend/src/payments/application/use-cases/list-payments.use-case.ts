import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from '../../infrastructure/repositories';
import { ListPaymentsParams } from '../interfaces/list-payments-params.interface';

@Injectable()
export class ListPaymentsUseCase {
  constructor(private readonly paymentsRepo: PaymentsRepository) { }

  async execute(params: ListPaymentsParams) {
    const {
      page,
      limit,
      subscriptionId,
      status,
      sortBy = 'created_at',
      sortOrder = 'DESC',
      filters = {},
    } = params;

    const skip = (page - 1) * limit;
    const take = limit;

    return this.paymentsRepo.findAll({
      skip,
      take,
      subscriptionId,
      status,
      sortBy,
      sortOrder,
      filters,
    });
  }
}