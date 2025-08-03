import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../infraestructure/repositories';
import { ListUsersParams } from './interfaces/list-users-params.interface';

@Injectable()
export class ListUsersUseCase {

   constructor(private readonly usersRepo: UsersRepository) { }

   async execute(params: ListUsersParams) {
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

      return this.usersRepo.findAll({
         skip,
         take,
         search,
         sortBy,
         sortOrder,
         filters
      });
   }

}