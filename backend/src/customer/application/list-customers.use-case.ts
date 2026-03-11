import { Injectable } from '@nestjs/common';
import { CustomersRepository } from '../infrastructure/repositories';
import { ListCustomersParams } from './interfaces/list-customers-params.interface';

@Injectable()
export class ListCustomersUseCase {

  constructor(private readonly customersRepo: CustomersRepository) { }

  async execute(params: ListCustomersParams) {
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

    return this.customersRepo.findAll({
      skip,
      take,
      search,
      sortBy,
      sortOrder,
      filters,
    });
  }
}