export interface FindPlansParams {
  skip?: number;
  take?: number;
  name?: string;
  description?: string;
  price?: number;
  durationMonths?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  filters?: Record<string, any>;
}