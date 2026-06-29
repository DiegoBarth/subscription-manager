import {
  IsNotEmpty,
  IsInt,
  IsDateString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionStatus } from 'src/subscriptions/domain/enums';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 1 })
  customerId!: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 2 })
  planId!: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2026-03-12' })
  startDate!: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2027-03-12' })
  endDate!: string;

  @IsOptional()
  @IsEnum(SubscriptionStatus)
  @ApiProperty({
    example: SubscriptionStatus.ACTIVE,
    required: false,
    enum: SubscriptionStatus,
  })
  status?: SubscriptionStatus;
}