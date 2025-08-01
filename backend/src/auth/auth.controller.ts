import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginUseCase } from './use-cases/login.use-case';
import { plainToInstance } from 'class-transformer';
import { TokenResponseDto } from './dto/token-response.dto';

@Controller('auth')
export class AuthController {

   constructor(private readonly loginUseCase: LoginUseCase) { }

   @Post('login')
   async login(@Body() dto: LoginDto) {
      const token = await this.loginUseCase.execute(dto.email, dto.password);

      return { success: true, data: plainToInstance(TokenResponseDto, token) };
   }

}