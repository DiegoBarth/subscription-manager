import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/customer/adapters/dto';
import { FindCustomersParams } from 'src/customer/domain/interfaces/find-customers-params.interface';

@Injectable()
export class CustomersRepository {

  constructor(private readonly prisma: PrismaService) { }

  create(data: CreateCustomerDto & { userId: number }) {
    return this.prisma.customer.create({
      data: {
        user_id: data.userId,
        name: data.name,
        email: data.email,
        phone: data.phone
      }
    });
  }

  update(id: number, data: UpdateCustomerDto) {
    const prismaData: any = { ...data };

    return this.prisma.customer.update({
      where: { id },
      data: prismaData
    });
  }

  findById(id: number) {
    return this.prisma.customer.findUnique({
      where: { id }
    });
  }

  findAll(params?: FindCustomersParams) {
    const {
      skip,
      take,
      name,
      email,
      phone,
      userId,
      search,
      sortBy = 'created_at',
      sortOrder = 'DESC',
      filters = {}
    } = params || {};

    const where: any = { ...filters };

    // Pesquisa por texto parcial
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } }
      ];
    }

    if (name) where.name = { contains: name };
    if (email) where.email = { contains: email };
    if (phone) where.phone = { contains: phone };
    if (userId) where.user_id = userId;

    return this.prisma.customer.findMany({
      skip,
      take,
      where,
      orderBy: {
        [sortBy]: sortOrder.toLowerCase()
      }
    });
  }

  findByEmail(email: string) {
    return this.prisma.customer.findFirst({
      where: { email }
    });
  }

}