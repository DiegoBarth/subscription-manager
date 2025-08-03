export interface FindUsersParams {
   skip?: number;
   take?: number;
   name?: string;
   email?: string;
   role?: string;
   search?: string;
   sortBy?: string;
   sortOrder?: 'ASC' | 'DESC';
   filters?: Record<string, any>;
}