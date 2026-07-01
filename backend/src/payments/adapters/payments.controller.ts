import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';

import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { ApplySwagger } from 'src/common/decorators/apply-swagger.decorator';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/common/decorators';
import { UserRole } from '@prisma/client';

import {
  CreatePaymentDto,
  ListPaymentsDto,
  UpdatePaymentDto,
  PaymentResponseDto,
  MarkPaymentAsPaidDto
} from './dto';

import {
  CreatePaymentUseCase,
  ListPaymentsUseCase,
  FindPaymentUseCase,
  UpdatePaymentUseCase,
  MarkPaymentAsPaidUseCase,
  RefundPaymentUseCase
} from '../application';

import { PaymentsSwagger } from './payments.swagger';

@Controller('payments')
@ApiTags('Payments')
export class PaymentsController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly listPaymentsUseCase: ListPaymentsUseCase,
    private readonly findPaymentUseCase: FindPaymentUseCase,
    private readonly updatePaymentUseCase: UpdatePaymentUseCase,
    private readonly markPaymentAsPaidUseCase: MarkPaymentAsPaidUseCase,
    private readonly refundPaymentUseCase: RefundPaymentUseCase
  ) { }

  @Post()
  @Auth(UserRole.admin)
  @UseInterceptors(new SerializeInterceptor(PaymentResponseDto))
  @ApplySwagger(PaymentsSwagger.create)
  async create(@Body() dto: CreatePaymentDto) {
    return this.createPaymentUseCase.execute(dto);
  }

  @Get()
  @Auth()
  @UseInterceptors(new SerializeInterceptor(PaymentResponseDto))
  @ApplySwagger(PaymentsSwagger.list)
  async list(@Query() query: ListPaymentsDto) {
    const {
      page = '1',
      limit = '10',
      subscriptionId,
      status,
      sortBy,
      sortOrder,
    } = query;

    return this.listPaymentsUseCase.execute({
      page: Math.max(Number(page), 1),
      limit: Math.min(Math.max(Number(limit), 1), 100),
      subscriptionId: subscriptionId ? Number(subscriptionId) : undefined,
      status,
      sortBy,
      sortOrder,
      filters: {},
    });
  }

  @Get(':id')
  @Auth()
  @UseInterceptors(new SerializeInterceptor(PaymentResponseDto))
  @ApplySwagger(PaymentsSwagger.findById)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.findPaymentUseCase.execute(id);
  }

  @Patch(':id')
  @Auth(UserRole.admin)
  @UseInterceptors(new SerializeInterceptor(PaymentResponseDto))
  @ApplySwagger(PaymentsSwagger.update)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePaymentDto,
  ) {
    return this.updatePaymentUseCase.execute(id, dto);
  }

  @Patch(':id/pay')
  @Auth(UserRole.admin)
  @UseInterceptors(new SerializeInterceptor(PaymentResponseDto))
  @ApplySwagger(PaymentsSwagger.markAsPaid)
  async markAsPaid(@Param('id', ParseIntPipe) id: number, @Body() dto: MarkPaymentAsPaidDto) {
    return this.markPaymentAsPaidUseCase.execute(id, dto);
  }

  @Patch(':id/refund')
  @Auth(UserRole.admin)
  @ApplySwagger(PaymentsSwagger.refund)
  async refund(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.refundPaymentUseCase.execute(id);
  }
}