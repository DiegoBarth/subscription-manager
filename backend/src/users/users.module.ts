import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { ListUsersUseCase } from './use-cases/list-users.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';

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
