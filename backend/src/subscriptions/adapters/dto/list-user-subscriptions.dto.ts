import { IsOptional, IsNumberString, IsIn, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListUserSubscriptionsDto {

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({ example: 1 })
  page?: string;

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({ example: 10 })
  limit?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'active' })
  search?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'created_at' })
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  @ApiPropertyOptional({ example: 'DESC' })
  sortOrder?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'active' })
  status?: string;
}