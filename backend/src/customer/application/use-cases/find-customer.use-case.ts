import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomersRepository } from '../../infrastructure/repositories';

@Injectable()
export class FindCustomerUseCase {

  constructor(private readonly customersRepo: CustomersRepository) { }

  async execute(id: number) {
    const customer = await this.customersRepo.findById(id);

    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    if (customer.deleted_at) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    return customer;
  }

}