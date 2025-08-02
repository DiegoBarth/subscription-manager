import { Module } from '@nestjs/common';
import { UsersController } from './adapters';
import { UsersRepository } from './infraestructure/repositories';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserUseCase, ListUsersUseCase, UpdateUserUseCase } from './application';

@Module({
   controllers: [UsersController],
   providers: [
      UsersRepository,
      PrismaService,
      CreateUserUseCase,
      ListUsersUseCase,
      UpdateUserUseCase,
   ],
   exports: [UsersRepository],
})
export class UsersModule { }
