import { Module } from '@nestjs/common';
import { UsersController } from './adapters';
import { UsersRepository } from './infrastructure/repositories';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUserUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
  FindUserUseCase,
  FindMeUserUseCase,
  UpdateMeUserUseCase,
  ChangePasswordUseCase,
  ResetUserPasswordUseCase,
  UpdateUserStatusUseCase,
  DeleteUserUseCase
} from './application';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    UsersRepository,
    PrismaService,
    CreateUserUseCase,
    ListUsersUseCase,
    UpdateUserUseCase,
    FindUserUseCase,
    FindMeUserUseCase,
    UpdateMeUserUseCase,
    ChangePasswordUseCase,
    ResetUserPasswordUseCase,
    UpdateUserStatusUseCase,
    DeleteUserUseCase
  ],
  exports: [UsersRepository],
})
export class UsersModule { }
