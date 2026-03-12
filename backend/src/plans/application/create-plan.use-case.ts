import { Injectable, ConflictException } from '@nestjs/common';
import { PlansRepository } from '../infrastructure/repositories';
import { CreatePlanDto } from '../adapters/dto';

@Injectable()
export class CreatePlanUseCase {

  constructor(private readonly plansRepo: PlansRepository) { }

  async execute(data: CreatePlanDto) {
    const existingPlan = await this.plansRepo.findByName(data.name);

    if (existingPlan) {
      throw new ConflictException('Plan name already exists');
    }

    return this.plansRepo.create(data);
  }
}