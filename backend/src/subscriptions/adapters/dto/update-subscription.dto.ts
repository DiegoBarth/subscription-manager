import { IsOptional, IsInt, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSubscriptionDto {

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({ example: 2 })
  planId?: number;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ example: '2027-03-12' })
  endDate?: string;

}