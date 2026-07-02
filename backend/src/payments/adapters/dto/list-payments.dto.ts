import { IsEnum, IsOptional, IsInt, IsString, IsNumberString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaymentStatus } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListPaymentsDto {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({ example: 1 })
  @Transform(({ value }) => Number(value))
  subscriptionId?: number;

  @IsOptional()
  @IsEnum(PaymentStatus)
  @ApiPropertyOptional({ example: 1 })
  status?: PaymentStatus;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}