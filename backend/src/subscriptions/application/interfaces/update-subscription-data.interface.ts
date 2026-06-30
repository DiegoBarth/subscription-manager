import { SubscriptionStatus } from '../../domain/enums';

export interface UpdateSubscriptionData {
  planId?: number;
  startDate?: Date;
  endDate?: Date;
  status?: SubscriptionStatus;
  contractedPrice?: number;
}