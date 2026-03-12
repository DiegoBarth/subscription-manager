import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlanDto {

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({ example: 'Premium Plan' })
  name?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({ example: 'Access to all premium features' })
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 49.9 })
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 12 })
  durationMonths?: number;
}