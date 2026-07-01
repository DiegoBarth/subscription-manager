import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from '../../infrastructure/repositories';
import { ResetPasswordDto } from '../../adapters/dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';

@Injectable()
export class ResetUserPasswordUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
  ) { }

  async execute(
    id: number,
    dto: ResetPasswordDto,
  ): Promise<SuccessResponseDto> {
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const samePassword = await bcrypt.compare(
      dto.newPassword,
      user.password_hash,
    );

    if (samePassword) {
      throw new BadRequestException(
        'New password must be different from current password',
      );
    }

    await this.usersRepo.update(id, {
      password: await bcrypt.hash(dto.newPassword, 10),
    });

    return {
      message: 'Password reset successfully'
    };
  }
}