import { IsOptional, IsInt, IsDateString, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionStatus } from 'src/subscriptions/domain/enums';

export class UpdateSubscriptionDto {

  @IsOptional()
  @IsInt()
  @ApiProperty({ example: 2 })
  planId?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2027-03-12' })
  endDate?: string;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(SubscriptionStatus))
  @ApiProperty({ example: 'canceled' })
  status?: string;
}