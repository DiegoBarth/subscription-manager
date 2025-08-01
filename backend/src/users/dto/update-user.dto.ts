import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsStrongPassword } from 'src/common/validators/strong-password.validator';

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
   @IsIn(['admin', 'user', 'moderator'])
   role?: string;
   
}
