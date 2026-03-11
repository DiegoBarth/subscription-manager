import { CreateCustomerDto, UpdateCustomerDto, CustomerResponseDto } from './dto';

export const CustomersSwagger = {
  create: {
    summary: 'Create a new customer (Admin only)',
    bearerAuth: true,
    bodyType: CreateCustomerDto,
    roles: ['admin'],
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
  update: {
    summary: 'Update customer by ID (Admin only)',
    bearerAuth: true,
    bodyType: UpdateCustomerDto,
    roles: ['admin'],
    param: {
      name: 'id',
      type: Number,
      example: 1,
    },
    responseType: CustomerResponseDto,
  },
};