import { Module } from '@nestjs/common';
import { PlansController } from './adapters';
import { PlansRepository } from './infrastructure/repositories';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlanUseCase, ListPlansUseCase, UpdatePlanUseCase } from './application';

@Module({
  controllers: [PlansController],
  providers: [
    PlansRepository,
    PrismaService,
    CreatePlanUseCase,
    ListPlansUseCase,
    UpdatePlanUseCase,
  ],
  exports: [PlansRepository],
})
export class PlansModule { }