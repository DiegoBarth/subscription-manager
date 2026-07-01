import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { CustomersRepository } from '../../infrastructure/repositories';
import { UpdateCustomerDto } from '../../adapters/dto';

@Injectable()
export class UpdateCustomerUseCase {
  constructor(private readonly customersRepo: CustomersRepository) { }

  async execute(customerId: number, data: UpdateCustomerDto) {
    const customer = await this.customersRepo.findById(customerId);

    if (!customer) {
      throw new NotFoundException(`Customer with id ${customerId} not found`);
    }

    if (customer.deleted_at) {
      throw new BadRequestException('Cannot update a deleted customer');
    }

    if (data.email && data.email !== customer.email) {
      const emailExists = await this.customersRepo.findByEmail(data.email);

      if (emailExists && emailExists.id !== customerId) {
        throw new BadRequestException('Email already in use');
      }
    }

    if ((data as any).status) {
      throw new BadRequestException(
        'Status must be updated through status endpoint'
      );
    }

    return this.customersRepo.update(customerId, {
      name: data.name,
      email: data.email,
      phone: data.phone ?? undefined,
    });
  }
}