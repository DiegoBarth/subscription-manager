import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SuccessResponseDto } from 'src/common/dto';
import { CustomersRepository } from '../../infrastructure/repositories';
import { CustomerStatus } from '@prisma/client';
import { UpdateCustomerStatusDto } from 'src/customer/adapters/dto';

@Injectable()
export class UpdateCustomerStatusUseCase {
  constructor(
    private readonly customersRepo: CustomersRepository,
  ) { }

  async execute(
    id: number,
    dto: UpdateCustomerStatusDto,
  ): Promise<SuccessResponseDto> {

    const customer = await this.customersRepo.findById(id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (dto.status === CustomerStatus.pending) {
      throw new BadRequestException(
        'Customer status cannot be set to pending manually',
      );
    }

    if (customer.status === dto.status) {
      throw new BadRequestException(
        `Customer is already ${dto.status}`,
      );
    }

    if (customer.deleted_at) {
      throw new BadRequestException(
        'Cannot change status of deleted customer',
      );
    }

    await this.customersRepo.updateStatus(id, dto.status);

    return {
      message: 'Customer status updated successfully',
    };
  }
}