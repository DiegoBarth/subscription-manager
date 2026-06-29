import { SubscriptionStatus } from 'src/subscriptions/domain/enums/subscription-status.enum';

export interface ListUserSubscriptionsParams {
  customerId: number;
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  status?: SubscriptionStatus;
}