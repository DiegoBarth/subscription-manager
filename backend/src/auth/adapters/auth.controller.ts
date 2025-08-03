import { Controller, Post, Body, UseInterceptors, HttpCode } from '@nestjs/common';
import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { LoginUseCase, LogoutUseCase } from '../application';
import { RefreshTokenUseCase } from '../application';
import { LoginDto, TokenResponseDto, RefreshTokenDto } from './dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

   constructor(
      private readonly loginUseCase: LoginUseCase,
      private readonly logoutUseCase: LogoutUseCase,
      private readonly refreshTokenUseCase: RefreshTokenUseCase,
   ) { }

   @UseInterceptors(new SerializeInterceptor(TokenResponseDto))
   @Post('login')
   @ApiOperation({ summary: 'User login and receive access & refresh tokens' })
   @ApiBody({ type: LoginDto })
   async login(@Body() dto: LoginDto) {
      return this.loginUseCase.execute(dto.email, dto.password);
   }

   @UseInterceptors(new SerializeInterceptor(TokenResponseDto))
   @Post('refresh')
   @ApiOperation({ summary: 'Refresh access token using a refresh token' })
   @ApiBody({ type: RefreshTokenDto })
   async refresh(@Body() dto: RefreshTokenDto) {
      return this.refreshTokenUseCase.refresh(dto.refresh_token);
   }

   @Post('logout')
   @HttpCode(200)
   @ApiOperation({ summary: 'Logout and revoke the refresh token' })
   @ApiBody({ type: RefreshTokenDto })
   async logout(@Body('refresh_token') refreshToken: string) {
      await this.logoutUseCase.execute(refreshToken);
      return { message: 'Logged out successfully' };
   }

}