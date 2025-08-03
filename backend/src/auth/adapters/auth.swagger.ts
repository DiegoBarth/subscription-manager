import { LoginDto, TokenResponseDto, RefreshTokenDto } from './dto';

export const AuthSwagger = {
   login: {
      summary: 'User login and receive access & refresh tokens',
      bodyType: LoginDto,
      responseType: TokenResponseDto,
   },
   refresh: {
      summary: 'Refresh access token using a refresh token',
      bodyType: RefreshTokenDto,
      responseType: TokenResponseDto,
   },
   logout: {
      summary: 'Logout and revoke the refresh token',
      bodyType: RefreshTokenDto,
      httpCode: 200,
      responseExample: { message: 'Logged out successfully' },
   },
};