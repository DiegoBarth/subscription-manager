import { Module } from '@nestjs/common';
import { PaymentsController } from './adapters';
import { CreatePaymentUseCase, ListPaymentsUseCase, UpdatePaymentUseCase, FindPaymentUseCase, MarkPaymentAsPaidUseCase, RefundPaymentUseCase } from './application';
import { BillingModule } from 'src/billing/billing.module';

@Module({
  imports: [BillingModule],
  controllers: [PaymentsController],
  providers: [
    CreatePaymentUseCase,
    ListPaymentsUseCase,
    UpdatePaymentUseCase,
    FindPaymentUseCase,
    MarkPaymentAsPaidUseCase,
    RefundPaymentUseCase,
  ],
})
export class PaymentsModule {}