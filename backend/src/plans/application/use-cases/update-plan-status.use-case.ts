import { Injectable, NotFoundException } from '@nestjs/common';
import { PlansRepository } from '../../infrastructure/repositories';

@Injectable()
export class UpdatePlanStatusUseCase {
  constructor(
    private readonly plansRepo: PlansRepository,
  ) { }

  async execute(
    planId: number,
    active: boolean,
  ) {
    const plan = await this.plansRepo.findById(planId);

    if (!plan) {
      throw new NotFoundException(
        `Plan with id ${planId} not found`,
      );
    }

    if (plan.active === active) {
      return plan;
    }

    return this.plansRepo.updateStatus(
      planId,
      active,
    );
  }
}