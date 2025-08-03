import { Body, Query, Controller, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResponseDto, ListUsersDto } from './dto';
import { CreateUserUseCase, UpdateUserUseCase, ListUsersUseCase } from '../application';
import { RolesGuard } from 'src/auth/infrastructure';
import { AuthGuard } from '@nestjs/passport';
import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { ApiTags, ApiBody, ApiOperation, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ApplySwagger } from 'src/common/decorators/apply-swagger.decorator';
import { UsersSwagger } from './users.swagger';
import { Auth, Roles } from 'src/common/decorators';

@Controller('users')
@ApiTags('Users') 
export class UsersController {

   constructor(
      private readonly createUser: CreateUserUseCase,
      private readonly listUsers: ListUsersUseCase,
      private readonly updateUser: UpdateUserUseCase,
   ) { }

   @Post()
   @Auth()
   @Roles('admin')
   @UseInterceptors(new SerializeInterceptor(UserResponseDto))
   @ApplySwagger(UsersSwagger.create)
   async create(@Body() dto: CreateUserDto) {
      return await this.createUser.execute(dto);
   }

   @Get()
   @Auth()
   @UseInterceptors(new SerializeInterceptor(UserResponseDto))
   @ApplySwagger(UsersSwagger.findAll)
   async findAll(@Query() query: ListUsersDto) {
      const {
         page  = '1',
         limit = '10',
         search,
         sortBy,
         sortOrder
      } = query;

      const filters: Record<string, any> = {};

      return this.listUsers.execute({
         page:  Math.max(Number(page), 1),
         limit: Math.min(Math.max(Number(limit), 1), 100),
         search,
         sortBy,
         sortOrder,
         filters
      });
   }


   @Patch(':id')
   @Auth()
   @Roles('admin')
   @UseInterceptors(new SerializeInterceptor(UserResponseDto))
   @ApplySwagger(UsersSwagger.update)
   async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
      return await this.updateUser.execute(id, dto);
   }

}