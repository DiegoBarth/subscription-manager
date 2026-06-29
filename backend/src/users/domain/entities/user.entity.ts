import { Exclude } from 'class-transformer';
import { UserRole } from '../enums';

export class UserEntity {

  id!: string;
  name!: string;
  email!: string;
  role!: string;

  @Exclude()
  password!: string;

  createdAt!: Date;
  updatedAt!: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  get displayName(): string {
    return this.name.toUpperCase();
  }

}