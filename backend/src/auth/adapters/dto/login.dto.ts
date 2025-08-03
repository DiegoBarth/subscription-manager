import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

   @IsEmail()
   @ApiProperty( {example: 'user.name@gmail.com'} )
   email: string;

   @IsNotEmpty()
   @IsString()
   @MinLength(8)
   @ApiProperty({example: 'user_password'})
   password: string;

}