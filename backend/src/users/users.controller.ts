import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) { }

   @Post()
   async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
      const user = await this.usersService.createUser(dto);
      return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
   }

   @Get()
   async findAll(): Promise<UserResponseDto[]> {
      const users = await this.usersService.findAll();
      return plainToInstance(UserResponseDto, users, { excludeExtraneousValues: true });
   }
}
