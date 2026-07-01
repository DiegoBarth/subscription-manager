import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PlansRepository } from '../../infrastructure/repositories';

@Injectable()
export class DeletePlanUseCase {
  constructor(
    private readonly plansRepo: PlansRepository,
  ) { }

  async execute(id: number) {
    const plan = await this.plansRepo.findById(id);

    if (!plan) {
      throw new NotFoundException(
        `Plan with id ${id} not found`,
      );
    }

    const hasActiveSubscriptions =
      await this.plansRepo.hasActiveSubscriptions(id);

    if (hasActiveSubscriptions) {
      throw new ConflictException(
        'Cannot delete a plan with active subscriptions.',
      );
    }

    return this.plansRepo.softDelete(id);
  }
}