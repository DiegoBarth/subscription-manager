import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { LoginUseCase } from './use-cases/login.use-case';
import { LoginDto } from './dto/login.dto';
import { TokenResponseDto } from './dto/token-response.dto';

@Controller('auth')
export class AuthController {

   constructor(private readonly loginUseCase: LoginUseCase) { }

   @UseInterceptors(new SerializeInterceptor(TokenResponseDto))
   @Post('login')
   async login(@Body() dto: LoginDto) {
      return await this.loginUseCase.execute(dto.email, dto.password);
   }

}