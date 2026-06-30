import { Injectable, ConflictException } from '@nestjs/common';
import { CustomersRepository } from '../../infrastructure/repositories';
import { CreateCustomerDto } from '../../adapters/dto';

@Injectable()
export class CreateCustomerUseCase {

  constructor(private readonly customersRepo: CustomersRepository) { }

  async execute(userId: number, data: CreateCustomerDto) {
    const existingCustomers = await this.customersRepo.findAll({
      email: data.email,
      userId
    });

    if (existingCustomers.length > 0) {
      throw new ConflictException('Customer email already registered for this user');
    }

    return this.customersRepo.create({
      ...data,
      userId
    });
  }
}