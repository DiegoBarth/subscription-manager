import { IsNotEmpty, IsInt, IsDateString, IsOptional, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionStatus } from 'src/subscriptions/domain/enums';

export class CreateSubscriptionDto {

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 1 })
  customerId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 2 })
  planId: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2026-03-12' })
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2027-03-12' })
  endDate: string;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(SubscriptionStatus))
  @ApiProperty({ example: 'active', required: false })
  status?: string;
}