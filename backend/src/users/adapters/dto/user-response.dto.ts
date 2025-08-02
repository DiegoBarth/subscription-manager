import { Exclude, Expose, Transform } from 'class-transformer';
import { IsIn } from 'class-validator';
import { UserRole } from './roles.enum';

export class UserResponseDto {

   @Expose()
   id: number;

   @Expose()
   name: string;

   @Expose()
   email: string;

   @Expose()
   @IsIn(Object.values(UserRole), { message: 'Invalid role.' })
   role: string;

   @Expose()
   @Transform(({ value }) => value?.toISOString())
   created_at: Date;

   @Expose()
   updated_at: Date;

   @Exclude()
   password_hash?: string;

   @Exclude()
   deleted_at?: Date;

}