import { IsOptional, IsInt, IsDateString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePaymentDto {

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    example: 4990,
    description: 'Amount in cents'
  })
  amount?: number;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: '2026-07-15'
  })
  dueDate?: string;

}