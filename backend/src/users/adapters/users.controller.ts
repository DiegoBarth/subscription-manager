import {
  Body,
  Query,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Delete,
  UseInterceptors,
} from '@nestjs/common';

import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  ListUsersDto,
  ResetPasswordDto,
  UpdateUserStatusDto,
  ChangePasswordDto,
  UpdateMeUserDto,
} from './dto';

import {
  CreateUserUseCase,
  UpdateUserUseCase,
  ListUsersUseCase,
  FindUserUseCase,
  FindMeUserUseCase,
  ChangePasswordUseCase,
  ResetUserPasswordUseCase,
  UpdateUserStatusUseCase,
  DeleteUserUseCase,
  UpdateMeUserUseCase,
} from '../application';

import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { ApplySwagger } from 'src/common/decorators/apply-swagger.decorator';
import { UsersSwagger } from './users.swagger';
import { Auth, AuthUser } from 'src/common/decorators';
import { UserRole } from '../domain/enums';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly listUsers: ListUsersUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly updateMeUser: UpdateMeUserUseCase,
    private readonly findUser: FindUserUseCase,
    private readonly findMeUser: FindMeUserUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly resetPasswordUseCase: ResetUserPasswordUseCase,
    private readonly updateStatusUseCase: UpdateUserStatusUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) { }

  // ==================================================
  // ADMIN - CREATE USER
  // ==================================================
  @Post()
  @Auth(UserRole.ADMIN)
  @UseInterceptors(new SerializeInterceptor(UserResponseDto))
  @ApplySwagger(UsersSwagger.create)
  async create(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto);
  }

  // ==================================================
  // ADMIN - LIST USERS
  // ==================================================
  @Get()
  @Auth(UserRole.ADMIN)
  @UseInterceptors(new SerializeInterceptor(UserResponseDto))
  @ApplySwagger(UsersSwagger.findAll)
  async findAll(@Query() query: ListUsersDto) {
    return this.listUsers.execute({
      page: Math.max(Number(query.page ?? 1), 1),
      limit: Math.min(Math.max(Number(query.limit ?? 10), 1), 100),
      search: query.search,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      filters: {},
    });
  }

  // ==================================================
  // SELF SERVICE - PROFILE
  // ==================================================
  @Get('me')
  @Auth()
  @UseInterceptors(new SerializeInterceptor(UserResponseDto))
  @ApplySwagger(UsersSwagger.me)
  async me(@AuthUser('id') userId: number) {
    return this.findMeUser.execute(userId);
  }

  @Patch('me')
  @Auth()
  @UseInterceptors(new SerializeInterceptor(UserResponseDto))
  @ApplySwagger(UsersSwagger.updateMe)
  async updateMe(
    @AuthUser('id') userId: number,
    @Body() dto: UpdateMeUserDto,
  ) {
    return this.updateMeUser.execute(
      userId,
      dto,
    );
  }

  @Patch('me/password')
  @Auth()
  @ApplySwagger(UsersSwagger.changePassword)
  async changePassword(
    @AuthUser('id') userId: number,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.changePasswordUseCase.execute(
      userId,
      dto,
    );
  }

  // ==================================================
  // ADMIN - USER MANAGEMENT
  // ==================================================
  @Get(':id')
  @Auth(UserRole.ADMIN)
  @UseInterceptors(new SerializeInterceptor(UserResponseDto))
  @ApplySwagger(UsersSwagger.findById)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.findUser.execute(id);
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN)
  @UseInterceptors(new SerializeInterceptor(UserResponseDto))
  @ApplySwagger(UsersSwagger.update)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.updateUser.execute(
      id,
      dto,
    );
  }

  @Patch(':id/password')
  @Auth(UserRole.ADMIN)
  @ApplySwagger(UsersSwagger.resetPassword)
  async resetPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ResetPasswordDto,
  ) {
    return this.resetPasswordUseCase.execute(
      id,
      dto,
    );
  }

  @Patch(':id/status')
  @Auth(UserRole.ADMIN)
  @ApplySwagger(UsersSwagger.updateStatus)
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser('id') currentUserId: number,
    @Body() dto: UpdateUserStatusDto,
  ) {
    return this.updateStatusUseCase.execute(
      id,
      currentUserId,
      dto,
    );
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  @ApplySwagger(UsersSwagger.delete)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser('id') currentUserId: number,
  ) {
    return this.deleteUser.execute(
      id,
      currentUserId,
    );
  }
}