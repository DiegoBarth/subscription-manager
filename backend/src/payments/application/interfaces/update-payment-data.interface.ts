import { PaymentStatus } from '../../domain/enums/payment-status.enum';
import { PaymentMethod } from '../../domain/enums/payment-method.enum';

export interface UpdatePaymentData {
  amount?: number;
  dueDate?: Date;
  paymentMethod?: PaymentMethod;
  paidAt?: Date;
  status?: PaymentStatus;
}