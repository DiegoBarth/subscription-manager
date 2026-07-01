import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateMeUserDto } from "src/users/adapters/dto/update-me-user.dto";
import { UsersRepository } from "src/users/infrastructure/repositories";

@Injectable()
export class UpdateMeUserUseCase {

  constructor(private readonly usersRepo: UsersRepository) { }

  async execute(userId: number, dto: UpdateMeUserDto) {
    const user = await this.usersRepo.findById(userId);

    if(!user) {
      throw new NotFoundException('User not found');
    }

    if(dto.email && dto.email !== user.email) {
      const emailExists = await this.usersRepo.findByEmail(dto.email);

      if(emailExists) {
        throw new ConflictException('Email already in use');
      }
    }

    return this.usersRepo.update(userId, dto);
  }

}