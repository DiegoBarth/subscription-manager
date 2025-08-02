import {
   Body,
   Query,
   Controller,
   Get,
   Param,
   Patch,
   Post
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { ListUsersUseCase } from './use-cases/list-users.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { RolesGuard } from 'src/auth/infrastructure/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/infrastructure/decorators/roles.decorator';
import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';

@Controller('users')
export class UsersController {

   constructor(
      private readonly createUser: CreateUserUseCase,
      private readonly listUsers: ListUsersUseCase,
      private readonly updateUser: UpdateUserUseCase,
   ) { }

   @UseInterceptors(new SerializeInterceptor(UserResponseDto))
   @UseGuards(AuthGuard('jwt'), RolesGuard)
   @Roles('admin')
   @Post()
   async create(@Body() dto: CreateUserDto) {
      return await this.createUser.execute(dto);
   }
   
   @UseGuards(AuthGuard('jwt'), RolesGuard)
   @UseInterceptors(new SerializeInterceptor(UserResponseDto))
   @Get()
   async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
      const pageNumber  = Math.max(Number(page) || 1, 1);
      const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 100);

      return this.listUsers.execute({ page: pageNumber, limit: limitNumber });
   }

   @UseInterceptors(new SerializeInterceptor(UserResponseDto))
   @Patch(':id')
   async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
      return await this.updateUser.execute(id, dto);
   }

}