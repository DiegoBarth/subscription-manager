import { SubscriptionStatus } from "@prisma/client";

export interface ListUserSubscriptionsParams {
  userId: number;
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  status?: SubscriptionStatus;
}