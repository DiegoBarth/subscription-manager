import { Controller, Post, Body, UseInterceptors, HttpCode } from '@nestjs/common';
import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { LoginUseCase, LogoutUseCase, RefreshTokenUseCase } from '../application';
import { LoginDto, TokenResponseDto, RefreshTokenDto } from './dto';
import { ApplySwagger } from 'src/common/decorators';
import { AuthSwagger } from './auth.swagger';

@Controller('auth')
export class AuthController {

   constructor(
      private readonly loginUseCase: LoginUseCase,
      private readonly logoutUseCase: LogoutUseCase,
      private readonly refreshTokenUseCase: RefreshTokenUseCase,
   ) { }

   @Post('login')
   @UseInterceptors(new SerializeInterceptor(TokenResponseDto))
   @ApplySwagger(AuthSwagger.login)
   async login(@Body() dto: LoginDto) {
      return this.loginUseCase.execute(dto.email, dto.password);
   }

   @Post('refresh')
   @UseInterceptors(new SerializeInterceptor(TokenResponseDto))
   @ApplySwagger(AuthSwagger.refresh)
   async refresh(@Body() dto: RefreshTokenDto) {
      return this.refreshTokenUseCase.refresh(dto.refresh_token);
   }

   @Post('logout')
   @HttpCode(200)
   @ApplySwagger(AuthSwagger.logout)
   async logout(@Body('refresh_token') refreshToken: string) {
      await this.logoutUseCase.execute(refreshToken);
      return { message: 'Logged out successfully' };
   }

}