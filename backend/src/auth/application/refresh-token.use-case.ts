import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenRepository } from '../infrastructure';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';

@Injectable()
export class RefreshTokenUseCase {
   constructor(
      private readonly refreshTokenRepository: RefreshTokenRepository,
      private readonly jwtService: JwtService,
   ) { }

   generateRefreshToken() {
      return randomBytes(64).toString('hex');
   }

   async refresh(refreshToken: string) {
      const tokenRecord = await this.refreshTokenRepository.findByToken(refreshToken);

      if(!tokenRecord) {
         throw new UnauthorizedException('Invalid refresh token');
      }

      if(tokenRecord.expires_at < new Date()) {
         await this.refreshTokenRepository.remove(refreshToken);
         throw new UnauthorizedException('Refresh token expired');
      }

      const user = tokenRecord.user;
      const payload = { sub: user.id, email: user.email, role: user.role };

      const access_token = await this.jwtService.signAsync(payload, {
         expiresIn: '1h',
      });

      const newRefreshToken = this.generateRefreshToken();
      const expires_at = new Date();
      expires_at.setDate(expires_at.getDate() + 30);

      await this.refreshTokenRepository.remove(refreshToken);
      await this.refreshTokenRepository.create(newRefreshToken, user.id, expires_at);

      return { access_token, refresh_token: newRefreshToken };
   }
}
