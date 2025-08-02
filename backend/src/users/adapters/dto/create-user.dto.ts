import { IsEmail, IsNotEmpty, IsString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsStrongPassword } from 'src/common/validators';
import { UserRole } from './roles.enum';

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
   @IsIn(Object.values(UserRole))
   role: string;
   
}