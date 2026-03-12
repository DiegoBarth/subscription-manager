import { Body, Query, Controller, Param, Patch, Get, Post, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto, CustomerResponseDto, ListCustomersDto } from './dto';
import { CreateCustomerUseCase, UpdateCustomerUseCase, ListCustomersUseCase } from '../application';
import { Auth, AuthUser } from 'src/common/decorators';
import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { ApiTags } from '@nestjs/swagger';

@Controller('customers')
@ApiTags('Customers')
export class CustomersController {

  constructor(
    private readonly createCustomer: CreateCustomerUseCase,
    private readonly listCustomers: ListCustomersUseCase,
    private readonly updateCustomer: UpdateCustomerUseCase,
  ) { }

  @Post()
  @Auth('admin')
  @UseInterceptors(new SerializeInterceptor(CustomerResponseDto))
  async create(@Body() dto: CreateCustomerDto, @AuthUser('id') userId: number) {
    return await this.createCustomer.execute(userId, dto);
  }

  @Get()
  @Auth()
  @UseInterceptors(new SerializeInterceptor(CustomerResponseDto))
  async findAll(@Query() query: ListCustomersDto) {
    const {
      page = '1',
      limit = '10',
      search,
      sortBy,
      sortOrder,
    } = query;

    const filters: Record<string, any> = {};

    return this.listCustomers.execute({
      page: Math.max(Number(page), 1),
      limit: Math.min(Math.max(Number(limit), 1), 100),
      search,
      sortBy,
      sortOrder,
      filters,
    });
  }

  @Patch(':id')
  @Auth('admin')
  @UseInterceptors(new SerializeInterceptor(CustomerResponseDto))
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCustomerDto) {
    return await this.updateCustomer.execute(Number(id), dto);
  }
}