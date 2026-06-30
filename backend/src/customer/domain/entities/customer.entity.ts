export class CustomerEntity {
  id!: number;
  userId!: number;
  name!: string;
  email!: string;
  phone?: string;

  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  constructor(partial: Partial<CustomerEntity>) {
    Object.assign(this, partial);
  }

  hasPhone(): boolean {
    return !!this.phone;
  }

  get displayName(): string {
    return this.name.toUpperCase();
  }
}