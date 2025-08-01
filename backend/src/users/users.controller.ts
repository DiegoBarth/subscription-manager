import {
   Body,
   Query,
   Controller,
   Get,
   Param,
   Patch,
   Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { ListUsersUseCase } from './use-cases/list-users.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {

   constructor(
      private readonly createUser: CreateUserUseCase,
      private readonly listUsers: ListUsersUseCase,
      private readonly updateUser: UpdateUserUseCase,
   ) { }

   @Post()
   async create(@Body() dto: CreateUserDto) {
      const user = await this.createUser.execute(dto);

      return { success: true, data: this.toUserResponse(user) };
   }

   @Get()
   @Get()
   async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
      const pageNumber  = Math.max(Number(page) || 1, 1);
      const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 100);

      const users = await this.listUsers.execute({ page: pageNumber, limit: limitNumber });

      return { success: true, data: this.toUserResponse(users) };
   }


   @Patch(':id')
   async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
      const user = await this.updateUser.execute(id, dto);

      return { success: true, data: this.toUserResponse(user) };
   }

   private toUserResponse(data: any) {
      return plainToInstance(UserResponseDto, data, { excludeExtraneousValues: true });
   }
   
}