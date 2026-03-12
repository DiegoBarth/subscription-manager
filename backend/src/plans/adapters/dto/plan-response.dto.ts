import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PlanResponseDto {

  @Expose()
  @ApiProperty({ example: '1' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Premium Plan' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'Access to all premium features' })
  description?: string;

  @Expose()
  @ApiProperty({ example: 49.9 })
  price: number;

  @Expose()
  @ApiProperty({ example: 12 })
  duration_months: number;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @ApiProperty({ example: '2025-07-29T19:37:05.464Z' })
  created_at: Date;

  @Expose()
  @ApiProperty({ example: '2025-07-29T19:37:05.464Z' })
  updated_at: Date;

  @Exclude()
  deleted_at?: Date;

}