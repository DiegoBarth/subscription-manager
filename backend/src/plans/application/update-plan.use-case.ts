import { Injectable, NotFoundException } from '@nestjs/common';
import { PlansRepository } from '../infrastructure/repositories';
import { UpdatePlanDto } from '../adapters/dto';

@Injectable()
export class UpdatePlanUseCase {

  constructor(private readonly plansRepo: PlansRepository) { }

  async execute(planId: number, data: UpdatePlanDto) {
    const existingPlan = await this.plansRepo.findById(planId);

    if (!existingPlan) {
      throw new NotFoundException(`Plan with id ${planId} not found`);
    }

    return this.plansRepo.update(planId, data);
  }
}