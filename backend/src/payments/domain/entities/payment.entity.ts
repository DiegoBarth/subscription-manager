import { Exclude } from 'class-transformer';
import { PaymentStatus, PaymentMethod } from '@prisma/client';

export class PaymentEntity {
  id!: number;

  subscriptionId!: number;

  amount!: number;

  dueDate!: Date;

  paidAt?: Date | null;

  status!: PaymentStatus;

  paymentMethod?: PaymentMethod | null;

  createdAt!: Date;
  updatedAt!: Date;

  @Exclude()
  deletedAt?: Date | null;

  constructor(partial: Partial<PaymentEntity>) {
    Object.assign(this, partial);
  }

  isPaid(): boolean {
    return this.status === PaymentStatus.paid;
  }

  isPending(): boolean {
    return this.status === PaymentStatus.pending;
  }

  isFailed(): boolean {
    return this.status === PaymentStatus.failed;
  }

  isRefunded(): boolean {
    return this.status === PaymentStatus.refunded;
  }

  isOverdue(): boolean {
    if (this.isPaid()) return false;
    return new Date() > this.dueDate;
  }

  markAsPaid(method: PaymentMethod): void {
    this.status = PaymentStatus.paid;
    this.paymentMethod = method;
    this.paidAt = new Date();
  }

}