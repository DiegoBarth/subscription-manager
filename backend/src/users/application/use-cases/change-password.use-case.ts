import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UsersRepository } from '../../infrastructure/repositories';
import { ChangePasswordDto } from '../../adapters/dto';
import { SuccessResponseDto } from 'src/common/dto';

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
  ) { }

  async execute(userId: number, dto: ChangePasswordDto): Promise<SuccessResponseDto> {
    const user = await this.usersRepo.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatches = await bcrypt.compare(
      dto.currentPassword,
      user.password_hash,
    );

    if (!passwordMatches) {
      throw new BadRequestException(
        'Current password is incorrect',
      );
    }

    const samePassword = await bcrypt.compare(
      dto.newPassword,
      user.password_hash,
    );

    if (samePassword) {
      throw new BadRequestException(
        'New password must be different from the current password',
      );
    }

    const hash = await bcrypt.hash(dto.newPassword, 10);

    await this.usersRepo.update(userId, {
      password: hash,
    });

    return {
      message: 'Password changed successfully',
    };
  }
}