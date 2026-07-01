import { IsEnum } from 'class-validator';
import { UserStatus } from '../../domain/enums';

export class UpdateUserStatusDto {
  @IsEnum(UserStatus)
  status!: UserStatus;
}