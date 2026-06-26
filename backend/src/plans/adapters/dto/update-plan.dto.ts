import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePlanDto {

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiPropertyOptional({ example: 'Premium Plan' })
  name?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @ApiPropertyOptional({ example: 'Access to all premium features' })
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional({ example: 49.9 })
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({ example: 12 })
  durationMonths?: number;
}