import { PaymentStatus, PaymentMethod } from "@prisma/client";

export interface UpdatePaymentData {
  amount?: number;
  dueDate?: Date;
  paymentMethod?: PaymentMethod;
  paidAt?: Date;
  refundedAt?: Date;
  status?: PaymentStatus;
}