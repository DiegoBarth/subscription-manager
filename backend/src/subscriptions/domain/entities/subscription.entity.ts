import { Exclude } from 'class-transformer';

export class SubscriptionEntity {

  id: number;
  customerId: number;
  planId: number;

  startDate: Date;
  endDate: Date;

  status: string;

  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  deletedAt?: Date;

  constructor(partial: Partial<SubscriptionEntity>) {
    Object.assign(this, partial);
  }

  isActive(): boolean {
    return this.status === 'active';
  }

  isExpired(): boolean {
    if (!this.endDate) return false;

    return new Date() > this.endDate;
  }

  get isValid(): boolean {
    return this.status === 'active' && !this.isExpired();
  }

}