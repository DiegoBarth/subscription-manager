import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({ example: 'John Doe', required: false })
  name?: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({ example: 'john.doe@gmail.com', required: false })
  email?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({ example: '+55 11 99999-9999', required: false })
  phone?: string;
}