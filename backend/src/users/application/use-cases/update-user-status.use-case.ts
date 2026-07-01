import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SuccessResponseDto } from 'src/common/dto';
import { UserRole, UserStatus } from 'src/users/domain/enums';
import { UpdateUserStatusDto } from 'src/users/adapters/dto';
import { UsersRepository } from 'src/users/infrastructure/repositories';

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

    const forbiddenTransitions = [
      UserStatus.PENDING,
    ];

    if (forbiddenTransitions.includes(dto.status)) {
      throw new BadRequestException(
        `Cannot manually set status to ${dto.status}`,
      );
    }

    if (
      id === currentUserId &&
      (dto.status === UserStatus.INACTIVE ||
        dto.status === UserStatus.BLOCKED)
    ) {
      throw new BadRequestException(
        'You cannot deactivate or block your own account',
      );
    }

    if (
      user.role === UserRole.ADMIN &&
      (dto.status === UserStatus.INACTIVE ||
        dto.status === UserStatus.BLOCKED)
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