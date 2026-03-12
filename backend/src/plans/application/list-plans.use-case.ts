import { Injectable } from '@nestjs/common';
import { PlansRepository } from '../infrastructure/repositories';
import { ListPlansParams } from './interfaces/list-plans-params.interface';

@Injectable()
export class ListPlansUseCase {

  constructor(private readonly plansRepo: PlansRepository) { }

  async execute(params: ListPlansParams) {
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

    return this.plansRepo.findAll({
      skip,
      take,
      search,
      sortBy,
      sortOrder,
      filters
    });
  }

}