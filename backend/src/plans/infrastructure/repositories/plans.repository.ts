import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlanDto, UpdatePlanDto } from 'src/plans/adapters/dto';
import { FindPlansParams } from 'src/plans/domain/interfaces/find-plans-params.interface';

@Injectable()
export class PlansRepository {

  constructor(private readonly prisma: PrismaService) { }

  create(data: CreatePlanDto) {
    return this.prisma.plan.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        duration_months: data.durationMonths
      }
    });
  }

  update(id: number, data: UpdatePlanDto) {
    const prismaData = { ...data } as any;

    if (prismaData.durationMonths) {
      prismaData.duration_months = prismaData.durationMonths;
      delete prismaData.durationMonths;
    }

    return this.prisma.plan.update({
      where: { id },
      data: prismaData
    });
  }

  findById(id: number) {
    return this.prisma.plan.findUnique({
      where: { id }
    });
  }

  findByName(name: string) {
    return this.prisma.plan.findFirst({
      where: {
        name,
        deleted_at: null
      }
    });
  }

  findAll(params?: FindPlansParams) {
    const {
      skip,
      take,
      name,
      description,
      price,
      durationMonths,
      search,
      sortBy = 'created_at',
      sortOrder = 'DESC',
      filters = {}
    } = params || {};

    const where: any = {
      deleted_at: null,
      ...filters,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (description) where.description = { contains: description, mode: 'insensitive' };
    if (price) where.price = price;
    if (durationMonths) where.duration_months = durationMonths;

    return this.prisma.plan.findMany({
      skip,
      take,
      where,
      orderBy: {
        [sortBy]: sortOrder.toLowerCase()
      }
    });
  }
}