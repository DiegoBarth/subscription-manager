import { PaymentStatus } from '../enums/payment-status.enum';

export interface FindPaymentsParams {
  skip?: number;
  take?: number;
  subscriptionId?: number;
  status?: PaymentStatus;
  dueDate?: Date;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  filters?: Record<string, any>;
}