import { IsEmail, IsOptional, IsString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsStrongPassword } from 'src/common/validators';
import { UserRole } from 'src/users/domain/enums';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

   @IsOptional()
   @IsString()
   @Transform(({ value }) => value.trim())
   @ApiProperty({example: 'User Name'})
   name?: string;

   @IsOptional()
   @IsEmail()
   @Transform(({ value }) => value.trim())
   @ApiProperty({example: 'user.name@gmail.com'})
   email?: string;

   @IsOptional()
   @IsStrongPassword()
   @ApiProperty({example: 'user_password'})
   password?: string;

   @IsOptional()
   @IsString()
   @IsIn(Object.values(UserRole))
   @ApiProperty({example: 'admin'})
   role?: string;
   
}
