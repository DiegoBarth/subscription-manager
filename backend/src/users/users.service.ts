import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { user as UserModel } from '@prisma/client';
import { hashPassword } from 'src/common/utils/hash-password';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
   constructor(private prisma: PrismaService) { }

   async createUser(data: CreateUserDto): Promise<UserModel> {
      const existingUser = await this.prisma.user.findUnique({
         where: { email: data.email },
      });

      if (existingUser) {
         throw new ConflictException('Email already in use');
      }

      const password_hash = await hashPassword(data.password);

      return this.prisma.user.create({
         data: {
            name: data.name,
            email: data.email.trim().toLowerCase(),
            password_hash,
            role: data.role,
         },
      });
   }


   async findAll(): Promise<UserModel[]> {
      return this.prisma.user.findMany();
   }

   async findByEmail(email: string): Promise<UserModel | null> {
      return this.prisma.user.findUnique({
         where: { email },
      });
   }
}
