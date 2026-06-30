import { PaymentStatus } from '../../domain/enums/payment-status.enum';

export interface CreatePaymentData {
  subscriptionId: number;
  amount: number;
  dueDate: string | Date;
  status: PaymentStatus;
}