import { Module } from '@nestjs/common';
import { PlansController } from './adapters';
import { PlansRepository } from './infrastructure/repositories';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreatePlanUseCase,
  ListPlansUseCase,
  UpdatePlanUseCase,
  FindPlanUseCase,
  UpdatePlanStatusUseCase,
  DeletePlanUseCase
} from './application';

@Module({
  controllers: [PlansController],
  providers: [
    PlansRepository,
    PrismaService,
    CreatePlanUseCase,
    ListPlansUseCase,
    UpdatePlanUseCase,
    FindPlanUseCase,
    UpdatePlanStatusUseCase,
    DeletePlanUseCase
  ],
  exports: [PlansRepository],
})
export class PlansModule { }