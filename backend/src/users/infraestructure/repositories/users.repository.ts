import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/adapters/dto';
import { FindUsersParams } from 'src/users/domain/interfaces/find-users-params.interface';

@Injectable()
export class UsersRepository {

   constructor(private readonly prisma: PrismaService) { }

   create(data: CreateUserDto & { password: string }) {
      return this.prisma.user.create({
         data: {
            name: data.name,
            email: data.email,
            role: data.role,
            password_hash: data.password
         }
      });
   }

   update(id: number, data: UpdateUserDto) {
      const prismaData = { ...data } as any;

      if (prismaData.password) {
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

   findAll(params?: FindUsersParams) {
      const {
         skip,
         take,
         name,
         email,
         role,
         search,
         sortBy = 'createdAt',
         sortOrder = 'DESC',
         filters = {}
      } = params || {};

      const where: any = {
         ...filters,
      };

      if(search) {
         where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
         ];
      }

      if(name) where.name   = { contains: name, mode: 'insensitive' };
      if(email) where.email = { contains: email, mode: 'insensitive' };
      if(role) where.role   = role;

      return this.prisma.user.findMany({
         skip,
         take,
         where,
         orderBy: {
            [sortBy]: sortOrder.toLowerCase()
         }
      });
   }

}