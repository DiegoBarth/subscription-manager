import { Body, Query, Controller, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto';
import { CreateUserUseCase, UpdateUserUseCase, ListUsersUseCase } from '../application';
import { RolesGuard } from 'src/auth/infrastructure';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/infrastructure';
import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { ApiBody, ApiOperation, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';

@Controller('users')
export class UsersController {

   constructor(
      private readonly createUser: CreateUserUseCase,
      private readonly listUsers: ListUsersUseCase,
      private readonly updateUser: UpdateUserUseCase,
   ) { }

   @UseGuards(AuthGuard('jwt'), RolesGuard)
   @UseInterceptors(new SerializeInterceptor(UserResponseDto))
   @Roles('admin')
   @Post()
   @ApiOperation({ summary: 'Create a new user (Admin only)' })
   @ApiBearerAuth()
   @ApiBody({ type: CreateUserDto })
   async create(@Body() dto: CreateUserDto) {
      return await this.createUser.execute(dto);
   }

   @UseGuards(AuthGuard('jwt'), RolesGuard)
   @UseInterceptors(new SerializeInterceptor(UserResponseDto))
   @Get()
   @ApiOperation({ summary: 'List all users (Paginated)' })
   @ApiBearerAuth()
   @ApiQuery({ name: 'page', required: false, example: 1 })
   @ApiQuery({ name: 'limit', required: false, example: 10 })
   async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
      const pageNumber = Math.max(Number(page) || 1, 1);
      const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 100);

      return this.listUsers.execute({ page: pageNumber, limit: limitNumber });
   }

   @UseGuards(AuthGuard('jwt'), RolesGuard)
   @UseInterceptors(new SerializeInterceptor(UserResponseDto))
   @Roles('admin')
   @Patch(':id')
   @ApiOperation({ summary: 'Update user by ID (Admin only)' })
   @ApiBearerAuth()
   @ApiParam({ name: 'id', type: Number })
   @ApiBody({ type: UpdateUserDto })
   async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
      return await this.updateUser.execute(id, dto);
   }

}