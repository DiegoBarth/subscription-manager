import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/adapters/dto';
import { UserRole, UserStatus } from 'src/users/domain/enums';
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

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (role) where.role = role;

    return this.prisma.user.findMany({
      skip,
      take,
      where,
      orderBy: {
        [sortBy]: sortOrder.toLowerCase()
      }
    });
  }

  async updateStatus(
    id: number,
    status: UserStatus,
  ) {
    return this.prisma.user.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  async softDelete(id: number) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  async countActiveAdmins() {
    return this.prisma.user.count({
      where: {
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        deleted_at: null,
      },
    });
  }

}