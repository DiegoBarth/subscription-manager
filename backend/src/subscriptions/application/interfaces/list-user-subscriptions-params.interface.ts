export interface ListUserSubscriptionsParams {
  customerId: number;
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  status?: string;
}