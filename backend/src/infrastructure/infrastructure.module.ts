import { Global, Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { UsersRepository } from 'src/users/infrastructure/repositories';
import { CustomersRepository } from 'src/customer/infrastructure/repositories';
import { PlansRepository } from 'src/plans/infrastructure/repositories';
import { PaymentsRepository } from 'src/payments/infrastructure/repositories';
import { SubscriptionsRepository } from 'src/subscriptions/infrastructure/repositories';

@Global()
@Module({
  providers: [
    PrismaService,

    UsersRepository,
    CustomersRepository,
    PlansRepository,
    PaymentsRepository,
    SubscriptionsRepository,
  ],
  exports: [
    PrismaService,

    UsersRepository,
    CustomersRepository,
    PlansRepository,
    PaymentsRepository,
    SubscriptionsRepository,
  ],
})
export class InfrastructureModule { }