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
         where: { token },
      });
   }
}
