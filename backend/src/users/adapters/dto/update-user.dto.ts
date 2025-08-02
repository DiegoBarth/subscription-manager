import { IsEmail, IsOptional, IsString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsStrongPassword } from 'src/common/validators';
import { UserRole } from './roles.enum';

export class UpdateUserDto {

   @IsOptional()
   @IsString()
   @Transform(({ value }) => value.trim())
   name?: string;

   @IsOptional()
   @IsEmail()
   @Transform(({ value }) => value.trim())
   email?: string;

   @IsOptional()
   @IsStrongPassword()
   password?: string;

   @IsOptional()
   @IsString()
   @IsIn(Object.values(UserRole))
   role?: string;
   
}
