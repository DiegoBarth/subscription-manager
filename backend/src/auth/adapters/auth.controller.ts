import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { LoginUseCase } from '../application/login.use-case';
import { RefreshTokenUseCase } from '../application/refresh-token.use-case';
import { LoginDto, TokenResponseDto, RefreshTokenDto } from './dto';

@Controller('auth')
export class AuthController {

   constructor(
      private readonly loginUseCase: LoginUseCase,
      private readonly refreshTokenUseCase: RefreshTokenUseCase,
   ) { }

   @UseInterceptors(new SerializeInterceptor(TokenResponseDto))
   @Post('login')
   async login(@Body() dto: LoginDto) {
      return this.loginUseCase.execute(dto.email, dto.password);
   }

   @UseInterceptors(new SerializeInterceptor(TokenResponseDto))
   @Post('refresh')
   async refresh(@Body() dto: RefreshTokenDto) {
      return this.refreshTokenUseCase.refresh(dto.refresh_token);
   }
}
