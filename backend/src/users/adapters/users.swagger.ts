import { SuccessResponseDto } from "src/common/dto";
import { UserRole } from "../domain/enums";
import { CreateUserDto, ResetPasswordDto, UpdateUserDto, UpdateUserStatusDto, UserResponseDto } from "./dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { UpdateMeUserDto } from "./dto/update-me-user.dto";

export const UsersSwagger = {
  create: {
    summary: 'Create a new user (Admin only)',
    bearerAuth: true,
    bodyType: CreateUserDto,
    roles: [UserRole.ADMIN],
    responseType: UserResponseDto
  },
  findAll: {
    summary: 'List all users - Paginated (Admin only)',
    bearerAuth: true,
    responseType: UserResponseDto,
    queryParams: [
      { name: 'page', required: false, example: 1 },
      { name: 'limit', required: false, example: 10 },
      { name: 'page', required: false, example: 1 },
      { name: 'limit', required: false, example: 10 },
      { name: 'search', required: false, example: 'Diego' },
      { name: 'sortBy', required: false, example: 'id' },
      { name: 'sortOrder', required: false, example: 'ASC' }
    ],
  },
  findById: {
    summary: 'Get user by ID (Admin only)',
    bearerAuth: true,
    param: {
      name: 'id',
      type: Number,
      example: 1
    },
    responseType: UserResponseDto
  },
  me: {
    summary: 'Get authenticated user',
    bearerAuth: true,
    responseType: UserResponseDto
  },
  update: {
    summary: 'Update user by ID (Admin only)',
    bearerAuth: true,
    bodyType: UpdateUserDto,
    roles: [UserRole.ADMIN],
    param: {
      name: 'id',
      type: Number,
      example: 1
    },
    responseType: UserResponseDto
  },
  updateMe: {
    summary: 'Update authenticated user',
    bearerAuth: true,
    bodyType: UpdateMeUserDto,
    responseType: UserResponseDto
  },
  changePassword: {
    summary: 'Change user password',
    bearerAuth: true,
    bodyType: ChangePasswordDto,
    responseType: SuccessResponseDto
  },
  resetPassword: {
    summary: 'Reset user password (Admin only)',
    bearerAuth: true,
    bodyType: ResetPasswordDto,
    responseType: SuccessResponseDto,
  },
  updateStatus: {
    summary: 'Activate or deactivate a user (Admin only)',
    bearerAuth: true,
    bodyType: UpdateUserStatusDto,
    responseType: SuccessResponseDto,
  },
  delete: {
    summary: 'Delete user (Admin only)',
    bearerAuth: true,
    responseType: SuccessResponseDto,
  }
};