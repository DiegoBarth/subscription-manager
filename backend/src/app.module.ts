import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PlansModule } from './plans/plans.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PaymentsModule } from './payments/payments.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      AuthModule,
      CustomerModule,
      PaymentsModule,
      PlansModule,
      SubscriptionsModule,
      UsersModule,
      PrismaModule,
      InfrastructureModule
   ],
   controllers: [AppController],
   providers: [AppService],
})

export class AppModule { }