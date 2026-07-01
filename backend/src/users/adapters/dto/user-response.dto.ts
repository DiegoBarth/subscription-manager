import { Exclude, Expose, Transform } from 'class-transformer';
import { IsIn } from 'class-validator';
import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from 'src/users/domain/enums';

export class UserResponseDto {

  @Expose()
  @ApiProperty({ example: '10' })
  id!: number;

  @Expose()
  @ApiProperty({ example: 'User Name' })
  name!: string;

  @Expose()
  @ApiProperty({ example: 'user.name@gmail.com' })
  email!: string;

  @Expose()
  @IsIn(Object.values(UserRole), { message: 'Invalid role.' })
  @ApiProperty({ example: UserRole.admin })
  role!: string;

  @Expose()
  @ApiProperty({ example: true })
  status!: UserStatus;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @ApiProperty({ example: '2025-07-29T19:37:05.464Z' })
  created_at!: Date;

  @Expose()
  @ApiProperty({ example: '2025-07-29T19:37:05.464Z' })
  updated_at!: Date;

  @Exclude()
  password_hash?: string;

  @Exclude()
  deleted_at?: Date;

}