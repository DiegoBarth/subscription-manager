import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomersRepository } from '../infrastructure/repositories';
import { UpdateCustomerDto } from '../adapters/dto';

@Injectable()
export class UpdateCustomerUseCase {

  constructor(private readonly customersRepo: CustomersRepository) { }

  async execute(customerId: number, data: UpdateCustomerDto) {
    const existingCustomer = await this.customersRepo.findById(customerId);

    if (!existingCustomer) {
      throw new NotFoundException(`Customer with id ${customerId} not found`);
    }

    // Não precisamos de hash, apenas atualiza os campos
    return this.customersRepo.update(customerId, data);
  }
}