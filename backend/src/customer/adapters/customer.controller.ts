import { Body, Query, Controller, Param, Patch, Get, Post, UseInterceptors, ParseIntPipe, Delete } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto, CustomerResponseDto, ListCustomersDto, UpdateCustomerStatusDto } from './dto';
import { CreateCustomerUseCase, UpdateCustomerUseCase, ListCustomersUseCase, FindCustomerUseCase, DeleteCustomerUseCase, UpdateCustomerStatusUseCase, FindCustomerByUserIdUseCase, UpdateCustomerMeUseCase } from '../application';
import { Auth, AuthUser } from 'src/common/decorators';
import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { ApplySwagger } from 'src/common/decorators/apply-swagger.decorator';
import { CustomersSwagger } from './customer.swagger';
import { UserRole } from 'src/users/domain/enums';

@Controller('customers')
@ApiTags('Customers')
export class CustomersController {

  constructor(
    private readonly createCustomer: CreateCustomerUseCase,
    private readonly listCustomers: ListCustomersUseCase,
    private readonly updateCustomer: UpdateCustomerUseCase,
    private readonly findCustomer: FindCustomerUseCase,
    private readonly deleteCustomer: DeleteCustomerUseCase,
    private readonly updateCustomerStatus: UpdateCustomerStatusUseCase,
    private readonly findCustomerByUserId: FindCustomerByUserIdUseCase,
    private readonly updateCustomerMe: UpdateCustomerMeUseCase
  ) { }


  @Post()
  @Auth(UserRole.ADMIN)
  @UseInterceptors(new SerializeInterceptor(CustomerResponseDto))
  @ApplySwagger(CustomersSwagger.create)
  async create(@Body() dto: CreateCustomerDto, @AuthUser('id') userId: number) {
    return this.createCustomer.execute(userId, dto);
  }

  @Get()
  @Auth(UserRole.ADMIN)
  @UseInterceptors(new SerializeInterceptor(CustomerResponseDto))
  @ApplySwagger(CustomersSwagger.findAll)
  async findAll(@Query() query: ListCustomersDto) {
    return this.listCustomers.execute({
      page: Math.max(Number(query.page ?? 1), 1),
      limit: Math.min(Math.max(Number(query.limit ?? 10), 1), 100),
      search: query.search,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      filters: {},
    });
  }

  // =========================
  // CLIENT
  // =========================

  @Get('me')
  @Auth(UserRole.CLIENT)
  @UseInterceptors(new SerializeInterceptor(CustomerResponseDto))
  @ApplySwagger(CustomersSwagger.me)
  async me(@AuthUser('id') userId: number) {
    return this.findCustomerByUserId.execute(userId);
  }

  @Patch('me')
  @Auth(UserRole.CLIENT)
  @UseInterceptors(new SerializeInterceptor(CustomerResponseDto))
  @ApplySwagger(CustomersSwagger.updateMe)
  async updateMe(
    @AuthUser('id') userId: number,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.updateCustomerMe.executeMe(userId, dto);
  }

  @Get(':id')
  @Auth(UserRole.ADMIN)
  @UseInterceptors(new SerializeInterceptor(CustomerResponseDto))
  @ApplySwagger(CustomersSwagger.findById)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.findCustomer.execute(id);
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN)
  @UseInterceptors(new SerializeInterceptor(CustomerResponseDto))
  @ApplySwagger(CustomersSwagger.update)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCustomerDto) {
    return this.updateCustomer.execute(id, dto);
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  @ApplySwagger(CustomersSwagger.delete)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.deleteCustomer.execute(id);
  }

  @Patch(':id/status')
  @Auth(UserRole.ADMIN)
  @ApplySwagger(CustomersSwagger.updateStatus)
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerStatusDto,
  ) {
    return this.updateCustomerStatus.execute(id, dto);
  }

}