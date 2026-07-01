import { Module } from '@nestjs/common';
import { CustomersController } from './adapters';
import { CustomersRepository } from './infrastructure/repositories';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCustomerUseCase,
  ListCustomersUseCase,
  UpdateCustomerUseCase,
  FindCustomerUseCase,
  DeleteCustomerUseCase,
  UpdateCustomerStatusUseCase,
  FindCustomerByUserIdUseCase,
  UpdateCustomerMeUseCase
} from './application';

@Module({
   controllers: [CustomersController],
   providers: [
      CustomersRepository,
      PrismaService,
      CreateCustomerUseCase,
      ListCustomersUseCase,
      UpdateCustomerUseCase,
      FindCustomerUseCase,
      DeleteCustomerUseCase,
      UpdateCustomerStatusUseCase,
      FindCustomerByUserIdUseCase,
      UpdateCustomerMeUseCase
   ],
   exports: [CustomersRepository],
})
export class CustomerModule {}