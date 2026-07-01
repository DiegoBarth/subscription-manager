import { Injectable } from "@nestjs/common";
import { RefreshTokenRepository } from "src/auth/infrastructure";

@Injectable()
export class AuthSessionService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) { }

  async revokeUserSessions(userId: number) {
    await this.refreshTokenRepository.removeByUserId(userId);
  }

  async revokeToken(token: string) {
    await this.refreshTokenRepository.remove(token);
  }

  async revokeAll() {
    await this.refreshTokenRepository.removeAll();
  }

  async cleanupExpired() {
    await this.refreshTokenRepository.removeExpired();
  }
}