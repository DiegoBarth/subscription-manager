import { PaymentStatus } from "@prisma/client";

export interface FindPaymentsParams {
  skip: number;
  take: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  filters?: {
    customerId?: number;
    subscriptionId?: number;
    status?: PaymentStatus;
  };
}