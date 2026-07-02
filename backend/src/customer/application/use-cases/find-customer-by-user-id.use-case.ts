import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CustomerResponseDto } from '../../adapters/dto';
import { CustomersRepository } from '../../infrastructure/repositories';

@Injectable()
export class FindCustomerByUserIdUseCase {
  constructor(
    private readonly customersRepo: CustomersRepository,
  ) { }

  async execute(userId: number): Promise<CustomerResponseDto> {
    const customer = await this.customersRepo.findActiveByUserId(userId);

    if (!customer) {
      throw new NotFoundException('Customer not found for this user');
    }

    return {
      ...customer,
      phone: customer.phone ?? undefined,
      deleted_at: customer.deleted_at ?? undefined
    };
  }
}