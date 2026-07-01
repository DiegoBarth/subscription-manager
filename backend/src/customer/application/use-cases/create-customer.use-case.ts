import { Injectable, ConflictException } from '@nestjs/common';
import { CustomersRepository } from '../../infrastructure/repositories';
import { CreateCustomerDto } from '../../adapters/dto';

@Injectable()
export class CreateCustomerUseCase {

  constructor(private readonly customersRepo: CustomersRepository) { }

  async execute(userId: number, data: CreateCustomerDto) {
    const existing = await this.customersRepo.findByUserIdAndEmail(userId, data.email);

    if (existing) {
      throw new ConflictException('Customer email already registered for this user');
    }

    return this.customersRepo.create({
      ...data,
      userId
    });
  }
}