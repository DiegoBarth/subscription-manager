import { Module } from '@nestjs/common';
import { SubscriptionsController } from './adapters';

import {
  CreateSubscriptionUseCase,
  ListSubscriptionsUseCase,
  UpdateSubscriptionUseCase,
  CancelSubscriptionUseCase,
  ListUserSubscriptionsUseCase,
  SubscribeSubscriptionUseCase,
  FindSubscriptionUseCase,
  RenewSubscriptionUseCase
} from './application';

import { CustomerModule } from 'src/customer/customer.module';
import { PlansModule } from 'src/plans/plans.module';
import { BillingModule } from 'src/billing/billing.module';

@Module({
  imports: [
    BillingModule,
    CustomerModule,
    PlansModule,
  ],
  controllers: [SubscriptionsController],
  providers: [
    CreateSubscriptionUseCase,
    ListSubscriptionsUseCase,
    UpdateSubscriptionUseCase,
    CancelSubscriptionUseCase,
    RenewSubscriptionUseCase,
    FindSubscriptionUseCase,
    ListUserSubscriptionsUseCase,
    SubscribeSubscriptionUseCase,
  ],
})
export class SubscriptionsModule {}