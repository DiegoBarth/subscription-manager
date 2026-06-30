import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 1 })
  subscriptionId!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 4990,
    description: 'Amount in cents'
  })
  amount!: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2026-06-30' })
  dueDate!: string;

}