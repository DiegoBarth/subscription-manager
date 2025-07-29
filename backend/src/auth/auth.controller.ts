import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../users/dto/user-response.dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) { }

   @Post('login')
   async login(@Body() data: LoginUserDto): Promise<UserResponseDto> {
      const user = await this.authService.validateUser(data.email, data.password);
      if (!user) {
         throw new UnauthorizedException('Invalid email or password');
      }
      return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
   }
}
