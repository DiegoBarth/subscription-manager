import { Exclude } from 'class-transformer';
import { SubscriptionStatus } from '@prisma/client';

export class SubscriptionEntity {

  id!: number;
  customerId!: number;
  planId!: number;

  startDate!: Date;
  endDate!: Date;

  status!: SubscriptionStatus;

  createdAt!: Date;
  updatedAt!: Date;

  @Exclude()
  deletedAt?: Date;

  constructor(partial: Partial<SubscriptionEntity>) {
    Object.assign(this, partial);
  }

  isActive(): boolean {
    return this.status === SubscriptionStatus.active;
  }

  isExpired(): boolean {
    return (
      this.status === SubscriptionStatus.expired ||
      new Date() > this.endDate
    );
  }

  get isValid(): boolean {
    return this.status === SubscriptionStatus.active && !this.isExpired();
  }

}