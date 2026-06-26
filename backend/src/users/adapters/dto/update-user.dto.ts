import { IsEmail, IsOptional, IsString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsStrongPassword } from 'src/common/validators';
import { UserRole } from 'src/users/domain/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {

   @IsOptional()
   @IsString()
   @Transform(({ value }) => value.trim())
   @ApiPropertyOptional({example: 'User Name'})
   name?: string;

   @IsOptional()
   @IsEmail()
   @Transform(({ value }) => value.trim())
   @ApiPropertyOptional({example: 'user.name@gmail.com'})
   email?: string;

   @IsOptional()
   @IsStrongPassword()
   @ApiPropertyOptional({example: 'user_password'})
   password?: string;

   @IsOptional()
   @IsString()
   @IsIn(Object.values(UserRole))
   @ApiPropertyOptional({example: 'admin'})
   role?: string;
   
}
