import { UserRole } from 'src/users/domain/enums';
import { CreateCustomerDto, UpdateCustomerDto, CustomerResponseDto, UpdateCustomerStatusDto } from './dto';
import { SuccessResponseDto } from 'src/common/dto';

export const CustomersSwagger = {
  create: {
    summary: 'Create a new customer (Admin only)',
    bearerAuth: true,
    bodyType: CreateCustomerDto,
    roles: [UserRole.ADMIN],
    responseType: CustomerResponseDto,
  },
  findAll: {
    summary: 'List all customers (Paginated)',
    bearerAuth: true,
    responseType: CustomerResponseDto,
    queryParams: [
      { name: 'page', required: false, example: 1 },
      { name: 'limit', required: false, example: 10 },
      { name: 'search', required: false, example: 'John Doe' },
      { name: 'sortBy', required: false, example: 'id' },
      { name: 'sortOrder', required: false, example: 'ASC' },
    ],
  },
  findById: {
    summary: 'Get customer by ID',
    bearerAuth: true,
    param: {
      name: 'id',
      type: Number,
      example: 1
    },
    responseType: CustomerResponseDto
  },
  update: {
    summary: 'Update customer by ID (Admin only)',
    bearerAuth: true,
    bodyType: UpdateCustomerDto,
    roles: [UserRole.ADMIN],
    param: {
      name: 'id',
      type: Number,
      example: 1,
    },
    responseType: CustomerResponseDto,
  },
  delete: {
    summary: 'Delete customer (admin only)',
    bearerAuth: true,
    responseType: SuccessResponseDto,
  },
  updateStatus: {
    summary: 'Activate/deactivate customer status (admin only)',
    bearerAuth: true,
    bodyType: UpdateCustomerStatusDto,
    responseType: SuccessResponseDto,
  },
  me: {
    summary: 'Get authenticated customer profile',
    bearerAuth: true,
    responseType: CustomerResponseDto,
  },
  updateMe: {
    summary: 'Update authenticated customer profile',
    bearerAuth: true,
    bodyType: UpdateCustomerDto,
    responseType: CustomerResponseDto,
  }
};