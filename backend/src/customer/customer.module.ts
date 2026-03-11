import { Module } from '@nestjs/common';
import { CustomersController } from './adapters';
import { CustomersRepository } from './infrastructure/repositories';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerUseCase, ListCustomersUseCase, UpdateCustomerUseCase } from './application';

@Module({
   controllers: [CustomersController],
   providers: [
      CustomersRepository,
      PrismaService,
      CreateCustomerUseCase,
      ListCustomersUseCase,
      UpdateCustomerUseCase,
   ],
   exports: [CustomersRepository],
})
export class CustomerModule {}