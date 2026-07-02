import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { SubscriptionsRepository } from '../../infrastructure/repositories';
import { UserRole } from '@prisma/client';
import { CustomersRepository } from 'src/customer/infrastructure/repositories';

@Injectable()
export class FindSubscriptionUseCase {

  constructor(
    private readonly subscriptionsRepo: SubscriptionsRepository,
    private readonly customersRepo: CustomersRepository
  ) { }

  async execute(id: number, user: any) {
    const subscription = await this.subscriptionsRepo.findById(id);

    if (!subscription) {
      throw new NotFoundException(`Subscription with id ${id} not found`);
    }

    if (user.role !== UserRole.admin) {

      const customer =
        await this.customersRepo.findActiveByUserId(user.id);

      if (!customer) {
        throw new NotFoundException(
          `Customer not found for user ${user.id}`,
        );
      }

      if (subscription.customer_id !== customer.id) {
        throw new ForbiddenException();
      }

    }

    return subscription;
  }

}