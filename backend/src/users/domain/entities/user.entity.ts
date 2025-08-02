import { Exclude } from 'class-transformer';

export class UserEntity {

   id:    string;
   name:  string;
   email: string;
   role:  string;

   @Exclude()
   password: string;

   createdAt: Date;
   updatedAt: Date;

   constructor(partial: Partial<UserEntity>) {
      Object.assign(this, partial);
   }

   isAdmin(): boolean {
      return this.role === 'admin';
   }

   get displayName(): string {
      return this.name.toUpperCase();
   }
   
}