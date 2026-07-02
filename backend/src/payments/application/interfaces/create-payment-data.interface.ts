import { PaymentStatus } from "@prisma/client";

export interface CreatePaymentData {
  subscriptionId: number;
  amount: number;
  dueDate: string | Date;
  status: PaymentStatus;
}