import { IsNotEmpty, IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({ example: 'Premium Plan' })
  name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({ example: 'Access to all premium features', required: false })
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 49.9 })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 12 })
  durationMonths: number;
}