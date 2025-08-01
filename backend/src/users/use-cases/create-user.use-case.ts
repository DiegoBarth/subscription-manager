import { Injectable, ConflictException } from '@nestjs/common';
import { UsersRepository } from '../users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { hashPassword } from 'src/common/utils/hash-password';

@Injectable()
export class CreateUserUseCase {

   constructor(private readonly usersRepo: UsersRepository) { }

   async execute(data: CreateUserDto) {
      const existingUser = await this.usersRepo.findByEmail(data.email);

      if(existingUser) {
         throw new ConflictException('Email already registered');
      }

      const hashedPassword = await hashPassword(data.password);
      
      return this.usersRepo.create({
         ...data,
         password: hashedPassword,
      });
   }

}