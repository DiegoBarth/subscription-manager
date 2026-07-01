import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SuccessResponseDto } from 'src/common/dto';
import { CustomersRepository } from '../../infrastructure/repositories';

@Injectable()
export class DeleteCustomerUseCase {
  constructor(
    private readonly customersRepo: CustomersRepository,
  ) {}

  async execute(id: number): Promise<SuccessResponseDto> {

    const customer = await this.customersRepo.findById(id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (customer.deleted_at) {
      throw new BadRequestException('Customer is already deleted');
    }

    const hasActiveSubscription =
      await this.customersRepo.hasActiveSubscription(id);

    if (hasActiveSubscription) {
      throw new BadRequestException(
        'Cannot delete customer with active subscription',
      );
    }

    const hasPendingPayments =
      await this.customersRepo.hasPendingPayments(id);

    if (hasPendingPayments) {
      throw new BadRequestException(
        'Cannot delete customer with pending payments',
      );
    }

    await this.customersRepo.softDelete(id);

    return {
      message: 'Customer deleted successfully',
    };
  }
}