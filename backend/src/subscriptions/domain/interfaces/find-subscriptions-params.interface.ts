export interface FindSubscriptionsParams {
  skip?: number;
  take?: number;
  customerId?: number;
  planId?: number;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  filters?: Record<string, any>;
}