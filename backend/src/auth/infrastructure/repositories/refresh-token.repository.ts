import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(token: string, userId: number, expiresAt: Date) {
    return this.prisma.refresh_token.create({
      data: {
        token,
        user_id: userId,
        expires_at: expiresAt,
      },
    });
  }

  async findByToken(token: string) {
    return this.prisma.refresh_token.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async remove(token: string) {
    return this.prisma.refresh_token.deleteMany({
      where: { token }
    });
  }

  async removeByUserId(userId: number) {
    return this.prisma.refresh_token.deleteMany({
      where: {
        user_id: userId,
      },
    });
  }

  async removeAll() {
    return this.prisma.refresh_token.deleteMany({});
  }

  async removeExpired() {
    return this.prisma.refresh_token.deleteMany({
      where: {
        expires_at: {
          lt: new Date(),
        },
      },
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.refresh_token.findMany({
      where: {
        user_id: userId,
      },
    });
  }

}
