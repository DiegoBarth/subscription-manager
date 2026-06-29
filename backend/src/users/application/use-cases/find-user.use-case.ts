import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/repositories';

@Injectable()
export class FindUserUseCase {

  constructor(private readonly usersRepo: UsersRepository) { }

  async execute(id: number) {
    const user = await this.usersRepo.findById(id);

    if(!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

}