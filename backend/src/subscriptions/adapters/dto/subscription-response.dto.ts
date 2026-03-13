import { Exclude, Expose, Transform } from 'class-transformer';
import { IsIn } from 'class-validator';
import { SubscriptionStatus } from 'src/subscriptions/domain/enums';
import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionResponseDto {

  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Expose()
  @ApiProperty({ example: 10 })
  customer_id: number;

  @Expose()
  @ApiProperty({ example: 2 })
  plan_id: number;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @ApiProperty({ example: '2026-03-12T00:00:00.000Z' })
  start_date: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @ApiProperty({ example: '2027-03-12T00:00:00.000Z' })
  end_date: Date;

  @Expose()
  @IsIn(Object.values(SubscriptionStatus), { message: 'Invalid status.' })
  @ApiProperty({ example: 'active' })
  status: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @ApiProperty({ example: '2026-03-12T10:00:00.000Z' })
  created_at: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @ApiProperty({ example: '2026-03-12T10:00:00.000Z' })
  updated_at: Date;

  @Exclude()
  deleted_at?: Date;
}