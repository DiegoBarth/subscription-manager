import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, PaymentMethod } from '@prisma/client';

export class PaymentResponseDto {

  @Expose()
  @ApiProperty({ example: 1 })
  id!: number;

  @Expose()
  @ApiProperty({ example: 10 })
  subscription_id!: number;

  @Expose()
  @Transform(({ value }) => value / 100)
  @ApiProperty({
    example: 49.90,
    description: 'Amount in currency'
  })
  amount!: number;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @ApiProperty({ example: '2026-10-15' })
  due_date!: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @ApiProperty({ example: '2026-10-10', required: false })
  paid_at?: string;

  @Expose()
  @ApiProperty({ example: PaymentStatus.paid })
  status!: PaymentStatus;

  @Expose()
  @ApiProperty({ example: PaymentMethod.pix })
  payment_method!: PaymentMethod;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @ApiProperty({ example: '2025-07-29T19:37:05.464Z' })
  created_at!: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @ApiProperty({ example: '2025-07-29T19:37:05.464Z' })
  updated_at!: Date;

  @Exclude()
  deleted_at?: Date;
}