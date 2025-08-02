import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/adapters/dto';

@Injectable()
export class UsersRepository {

   constructor(private readonly prisma: PrismaService) { }

   create(data: CreateUserDto & { password: string }) {
      return this.prisma.user.create({
         data: {
            name:          data.name,
            email:         data.email,
            role:          data.role,
            password_hash: data.password
         }
      });
   }

   update(id: number, data: UpdateUserDto) {
      const prismaData = { ...data } as any;

      if(prismaData.password) {
         prismaData.password_hash = prismaData.password;

         delete prismaData.password;
      }

      return this.prisma.user.update({ where: { id }, data: prismaData });
   }

   findByEmail(email: string) {
      return this.prisma.user.findUnique({ where: { email } });
   }

   findById(id: number) {
      return this.prisma.user.findUnique({ where: { id } });
   }

   findAll(params?: { skip?: number; take?: number }) {
      return this.prisma.user.findMany({
         skip: params?.skip,
         take: params?.take
      });
   }
   
}