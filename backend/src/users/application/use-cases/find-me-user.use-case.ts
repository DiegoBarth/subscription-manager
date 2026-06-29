import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/repositories';

@Injectable()
export class FindMeUserUseCase {

  constructor(
    private readonly usersRepo: UsersRepository,
  ) { }

  async execute(userId: number) {
    const user = await this.usersRepo.findById(userId);

    if(!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

}