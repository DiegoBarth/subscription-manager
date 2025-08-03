export interface ListUsersParams {
   page: number;
   limit: number;
   search?: string;
   sortBy?: string;
   sortOrder?: 'ASC' | 'DESC';
   filters?: Record<string, any>;
}