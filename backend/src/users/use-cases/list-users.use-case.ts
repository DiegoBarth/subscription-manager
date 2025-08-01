import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users.repository';


@Injectable()
export class ListUsersUseCase {
   
   constructor(private readonly usersRepo: UsersRepository) { }

   async execute({ page, limit }: { page: number; limit: number }) {
      const skip = (page - 1) * limit;

      return this.usersRepo.findAll({ skip, take: limit });
   }

}