import { PaymentStatus } from "@prisma/client";

export interface ListPaymentsParams {
  page: number;
  limit: number;
  subscriptionId?: number;
  status?: PaymentStatus;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  filters?: Record<string, any>;
}