import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { user } from '@prisma/client';

@Injectable()
export class AuthRepository {

   constructor(private readonly prisma: PrismaService) { }

   async findByEmail(email: string): Promise<user | null> {
      return this.prisma.user.findUnique({ where: { email } });
   }

}