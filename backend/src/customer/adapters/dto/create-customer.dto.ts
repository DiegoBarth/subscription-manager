import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsEmail()
  @Transform(({ value }) => value.trim())
  @ApiProperty({ example: 'john.doe@gmail.com' })
  email: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({ example: '+55 11 99999-9999', required: false })
  phone?: string;
}