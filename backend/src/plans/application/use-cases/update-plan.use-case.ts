import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PlansRepository } from '../../infrastructure/repositories';
import { UpdatePlanDto } from '../../adapters/dto';

@Injectable()
export class UpdatePlanUseCase {
  constructor(private readonly plansRepo: PlansRepository) { }

  async execute(planId: number, data: UpdatePlanDto) {
    const existingPlan = await this.plansRepo.findById(planId);

    if (!existingPlan) {
      throw new NotFoundException(
        `Plan with id ${planId} not found`,
      );
    }

    if (!Object.keys(data).length) {
      throw new BadRequestException(
        'No data provided',
      );
    }

    if (data.name) {
      const duplicated = await this.plansRepo.findByName(
        data.name.trim(),
      );

      if (duplicated && duplicated.id !== planId) {
        throw new ConflictException(
          'Plan name already exists',
        );
      }

      data.name = data.name.trim();
    }

    if (
      data.price !== undefined &&
      data.price <= 0
    ) {
      throw new BadRequestException(
        'Price must be greater than zero',
      );
    }

    if (
      data.durationMonths !== undefined &&
      data.durationMonths <= 0
    ) {
      throw new BadRequestException(
        'Duration must be greater than zero',
      );
    }

    return this.plansRepo.update(planId, data);
  }
}