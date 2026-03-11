import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto {

  @Expose()
  @ApiProperty({ example: 10 })
  id: number;

  @Expose()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'john.doe@gmail.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: '+55 11 99999-9999', required: false })
  phone?: string;

  @Expose()
  @ApiProperty({ example: 1 })
  userId: number;

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