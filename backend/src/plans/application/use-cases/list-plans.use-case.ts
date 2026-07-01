import { Injectable, NotFoundException } from '@nestjs/common';
import { PlansRepository } from '../../infrastructure/repositories';
import { ListPlansParams } from '../interfaces/list-plans-params.interface';
import { UserRole } from '@prisma/client';
import { UsersRepository } from 'src/users/infrastructure/repositories';

@Injectable()
export class ListPlansUseCase {
  constructor(
    private readonly plansRepo: PlansRepository,
    private readonly usersRepo: UsersRepository
  ) {}

  async execute(
    params: ListPlansParams,
    userId: number,
  ) {
    const {
      page,
      limit,
      search,
      sortBy = 'created_at',
      sortOrder = 'DESC',
    } = params;

    const user = await this.usersRepo.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const filters: Record<string, any> = {};

    if (user.role === UserRole.client) {
      filters.active = true;
    }

    return this.plansRepo.findAll({
      skip: (page - 1) * limit,
      take: limit,
      search,
      sortBy,
      sortOrder,
      filters,
    });
  }
}