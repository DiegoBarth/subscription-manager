import { SubscriptionStatus } from "@prisma/client";

export interface UpdateSubscriptionData {
  planId?: number;
  startDate?: Date;
  endDate?: Date;
  status?: SubscriptionStatus;
  contractedPrice?: number;
}