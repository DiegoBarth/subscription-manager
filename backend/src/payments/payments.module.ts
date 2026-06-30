import { Module } from '@nestjs/common';
import { PaymentsController } from './adapters';
import { PaymentsRepository } from './infrastructure/repositories';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentUseCase, ListPaymentsUseCase, UpdatePaymentUseCase, FindPaymentUseCase, MarkPaymentAsPaidUseCase, RefundPaymentUseCase } from './application';

@Module({
   controllers: [PaymentsController],
   providers: [
      PaymentsRepository,
      PrismaService,
      CreatePaymentUseCase,
      ListPaymentsUseCase,
      UpdatePaymentUseCase,
      FindPaymentUseCase,
      MarkPaymentAsPaidUseCase,
      RefundPaymentUseCase
   ],
   exports: [PaymentsRepository],
})
export class PaymentsModule { }
