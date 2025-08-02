import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateUserUseCase } from './validate-user.use-case';
import { randomBytes } from 'crypto';
import { RefreshTokenRepository } from '../infrastructure';

@Injectable()
export class LoginUseCase {
   constructor(
      private readonly validateUser: ValidateUserUseCase,
      private readonly jwtService: JwtService,
      private readonly refreshTokenRepository: RefreshTokenRepository,
   ) { }

   async execute(email: string, password: string) {
      const user = await this.validateUser.execute(email, password);
      const payload = { sub: user.id, email: user.email, role: user.role };

      const access_token = await this.jwtService.signAsync(payload, {
         expiresIn: '1h',
      });
      const refresh_token = this.generateRefreshToken();

      const expires_at = new Date();
      expires_at.setDate(expires_at.getDate() + 30);

      await this.refreshTokenRepository.create(refresh_token, user.id, expires_at);
      
      return { access_token, refresh_token };
   }

   generateRefreshToken() {
      return randomBytes(64).toString('hex');
   }
}
