import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCustomerDto {

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @ApiPropertyOptional({ example: 'John Doe', required: false })
  name?: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value?.trim())
  @ApiPropertyOptional({ example: 'john.doe@gmail.com', required: false })
  email?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @ApiPropertyOptional({ example: '+55 11 99999-9999', required: false })
  phone?: string;
}