import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../users.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { hashPassword } from 'src/common/utils/hash-password';

@Injectable()
export class UpdateUserUseCase {

   constructor(private readonly usersRepo: UsersRepository) { }

   async execute(userId: number, data: UpdateUserDto) {
      const userExists = await this.usersRepo.findById(userId);
      if (!userExists) {
         throw new NotFoundException(`User with id ${userId} not found`);
      }

      const updateData = { ...data };

      if (updateData.password) {
         updateData.password = await hashPassword(updateData.password);
      }

      return this.usersRepo.update(userId, updateData);
   }
   
}