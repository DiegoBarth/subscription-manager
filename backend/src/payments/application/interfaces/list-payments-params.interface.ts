import { PaymentStatus } from '../../domain/enums/payment-status.enum';

export interface ListPaymentsParams {
  page: number;
  limit: number;
  subscriptionId?: number;
  status?: PaymentStatus;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  filters?: Record<string, any>;
}