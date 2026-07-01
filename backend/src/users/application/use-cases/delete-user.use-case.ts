import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SuccessResponseDto } from 'src/common/dto';
import { UsersRepository } from '../../infrastructure/repositories';
import { AuthSessionService } from 'src/auth/application/services/auth-session.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly authSessionService: AuthSessionService,
  ) { }

  async execute(
    id: number,
    currentUserId: number,
  ): Promise<SuccessResponseDto> {
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.deleted_at) {
      throw new BadRequestException('User is already deleted');
    }

    if (id === currentUserId) {
      throw new BadRequestException('You cannot delete your own account');
    }

    const activeAdmins = await this.usersRepo.countActiveAdmins();

    const isAdmin = user.role === UserRole.admin;

    if (isAdmin && activeAdmins <= 1) {
      throw new BadRequestException(
        'The last active administrator cannot be deleted',
      );
    }

    await this.authSessionService.revokeUserSessions(id);

    await this.usersRepo.softDelete(id);

    return {
      message: 'User deleted successfully',
    };
  }
}