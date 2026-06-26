import { Injectable, NotFoundException } from '@nestjs/common';
import { PlansRepository } from '../infrastructure/repositories';

@Injectable()
export class FindPlanUseCase {

  constructor(private readonly plansRepo: PlansRepository) { }

  async execute(id: number) {
    const plan = await this.plansRepo.findById(id);

    if(!plan) {
      throw new NotFoundException(`Plan with id ${id} not found`);
    }

    return plan;
  }

}