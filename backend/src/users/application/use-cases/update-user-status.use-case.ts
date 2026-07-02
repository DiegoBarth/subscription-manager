import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SuccessResponseDto } from 'src/common/dto';
import { UpdateUserStatusDto } from 'src/users/adapters/dto';
import { UsersRepository } from 'src/users/infrastructure/repositories';
import { UserRole, UserStatus } from '@prisma/client';

@Injectable()
export class UpdateUserStatusUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
  ) { }

  async execute(
    id: number,
    currentUserId: number,
    dto: UpdateUserStatusDto,
  ): Promise<SuccessResponseDto> {

    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.status === dto.status) {
      throw new BadRequestException(
        `User is already ${dto.status}`,
      );
    }

    if (dto.status === UserStatus.pending) {
      throw new BadRequestException(
        `Cannot manually set status to ${dto.status}`,
      );
    }

    if (
      id === currentUserId &&
      (dto.status === UserStatus.inactive ||
        dto.status === UserStatus.blocked)
    ) {
      throw new BadRequestException(
        'You cannot deactivate or block your own account',
      );
    }

    if (
      user.role === UserRole.admin &&
      (dto.status === UserStatus.inactive ||
        dto.status === UserStatus.blocked)
    ) {
      const activeAdmins = await this.usersRepo.countActiveAdmins();

      if (activeAdmins <= 1) {
        throw new BadRequestException(
          'The last active administrator cannot be deactivated or blocked',
        );
      }
    }

    await this.usersRepo.updateStatus(id, dto.status);

    return {
      message: 'User status updated successfully',
    };
  }
}