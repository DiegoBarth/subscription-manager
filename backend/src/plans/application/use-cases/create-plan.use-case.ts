import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PlansRepository } from '../../infrastructure/repositories';
import { CreatePlanDto } from '../../adapters/dto';

@Injectable()
export class CreatePlanUseCase {
  constructor(private readonly plansRepo: PlansRepository) { }

  async execute(data: CreatePlanDto) {
    const name = data.name.trim();

    if (data.price <= 0) {
      throw new BadRequestException(
        'Price must be greater than zero',
      );
    }

    if (data.durationMonths <= 0) {
      throw new BadRequestException(
        'Duration must be greater than zero',
      );
    }

    const existingPlan = await this.plansRepo.findByName(name);

    if (existingPlan) {
      throw new ConflictException(
        'Plan name already exists',
      );
    }

    return this.plansRepo.create({
      ...data,
      name,
    });
  }
}