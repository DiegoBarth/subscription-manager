import { IsEmail, IsNotEmpty, IsString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsStrongPassword } from 'src/common/validators';
import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({ example: 'User Name' })
  name!: string;

  @IsEmail()
  @Transform(({ value }) => value.trim())
  @ApiProperty({ example: 'user.name@gmail.com' })
  email!: string;

  @IsStrongPassword()
  @ApiProperty({ example: 'user_password' })
  password!: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(UserRole))
  @ApiProperty({ example: UserRole.admin, enum: UserRole })
  role!: UserRole;
}