import { Module } from '@nestjs/common';
import { PaymentsController } from './adapters';
import {
  ListPaymentsUseCase,
  UpdatePaymentUseCase,
  FindPaymentUseCase,
  MarkPaymentAsPaidUseCase,
  RefundPaymentUseCase,
  ListPaymentsMineUseCase
} from './application';
import { BillingModule } from 'src/billing/billing.module';
import { PaymentAuthorizationService } from './application/services/payment-authorization.service';

@Module({
  imports: [BillingModule],
  controllers: [PaymentsController],
  providers: [
    ListPaymentsUseCase,
    UpdatePaymentUseCase,
    FindPaymentUseCase,
    MarkPaymentAsPaidUseCase,
    RefundPaymentUseCase,
    ListPaymentsMineUseCase,
    PaymentAuthorizationService
  ],
})
export class PaymentsModule {}