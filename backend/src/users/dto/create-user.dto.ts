import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsStrongPassword } from 'src/common/validators/strong-password.validator';

export class CreateUserDto {
   @IsNotEmpty()
   @IsString()
   @Transform(({ value }) => value.trim())
   name: string;

   @IsEmail()
   @Transform(({ value }) => value.trim())
   email: string;

   @IsStrongPassword()
   password: string;

   @IsNotEmpty()
   @IsString()
   @IsIn(['admin', 'user', 'moderator'])
   role: string;
}