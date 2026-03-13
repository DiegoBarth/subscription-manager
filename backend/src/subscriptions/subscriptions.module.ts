import { Module } from '@nestjs/common';
import { SubscriptionsController } from './adapters';
import { SubscriptionsRepository } from './infrastructure/repositories';
import { PrismaService } from 'src/prisma/prisma.service';

import {
  CreateSubscriptionUseCase,
  ListSubscriptionsUseCase,
  UpdateSubscriptionUseCase,
  CancelSubscriptionUseCase,
  ListUserSubscriptionsUseCase,
  SubscribeSubscriptionUseCase
} from './application';

import { CustomerModule } from 'src/customer/customer.module';
import { PlansModule } from 'src/plans/plans.module';

@Module({
  imports: [
    CustomerModule,
    PlansModule
  ],
  controllers: [SubscriptionsController],
  providers: [
    SubscriptionsRepository,
    PrismaService,
    CreateSubscriptionUseCase,
    ListSubscriptionsUseCase,
    UpdateSubscriptionUseCase,
    CancelSubscriptionUseCase,
    ListUserSubscriptionsUseCase,
    SubscribeSubscriptionUseCase
  ],
  exports: [SubscriptionsRepository],
})
export class SubscriptionsModule { }