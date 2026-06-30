import { Exclude } from 'class-transformer';
import { PaymentStatus } from '../enums/payment-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';

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
    return this.status === PaymentStatus.PAID;
  }

  isPending(): boolean {
    return this.status === PaymentStatus.PENDING;
  }

  isFailed(): boolean {
    return this.status === PaymentStatus.FAILED;
  }

  isRefunded(): boolean {
    return this.status === PaymentStatus.REFUNDED;
  }

  isOverdue(): boolean {
    if (this.isPaid()) return false;
    return new Date() > this.dueDate;
  }

  markAsPaid(method: PaymentMethod): void {
    this.status = PaymentStatus.PAID;
    this.paymentMethod = method;
    this.paidAt = new Date();
  }

}