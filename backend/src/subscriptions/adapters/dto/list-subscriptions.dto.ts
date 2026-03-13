import { IsOptional, IsNumberString, IsIn, IsString } from 'class-validator';

export class ListSubscriptionsDto {

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';

  @IsOptional()
  @IsNumberString()
  customerId?: string;

  @IsOptional()
  @IsNumberString()
  planId?: string;

  @IsOptional()
  @IsString()
  status?: string;
}