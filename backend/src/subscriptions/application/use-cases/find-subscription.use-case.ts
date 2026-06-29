import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { SubscriptionsRepository } from '../../infrastructure/repositories';
import { UserRole } from 'src/users/domain/enums';

@Injectable()
export class FindSubscriptionUseCase {

  constructor(private readonly subscriptionsRepo: SubscriptionsRepository) { }

  async execute(id: number, user: any) {
    const subscription = await this.subscriptionsRepo.findById(id);

    if(!subscription) {
      throw new NotFoundException(`Subscription with id ${id} not found`);
    }

    if(user.role !== UserRole.ADMIN && subscription.customer_id !== user.id) {
      throw new ForbiddenException();
    }

    return subscription;
  }

}