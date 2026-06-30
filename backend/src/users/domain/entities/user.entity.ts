import { Exclude } from 'class-transformer';
import { UserRole } from '../enums';

export class UserEntity {

  id!: number;
  name!: string;
  email!: string;
  role!: UserRole;

  @Exclude()
  password_hash!: string;

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