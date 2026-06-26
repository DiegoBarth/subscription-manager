import { IsOptional, IsInt, IsDateString, IsString, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SubscriptionStatus } from 'src/subscriptions/domain/enums';

export class UpdateSubscriptionDto {

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({ example: 2 })
  planId?: number;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ example: '2027-03-12' })
  endDate?: string;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(SubscriptionStatus))
  @ApiPropertyOptional({ example: 'canceled' })
  status?: string;
}