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

import { Auth, AuthUser } from 'src/common/decorators';
import { UserRole } from '@prisma/client';

import {
  ListPaymentsDto,
  UpdatePaymentDto,
  PaymentResponseDto,
  MarkPaymentAsPaidDto
} from './dto';

import {
  ListPaymentsUseCase,
  FindPaymentUseCase,
  UpdatePaymentUseCase,
  MarkPaymentAsPaidUseCase,
  RefundPaymentUseCase,
  ListPaymentsMineUseCase
} from '../application';

import { PaymentsSwagger } from './payments.swagger';

@Controller('payments')
@ApiTags('Payments')
export class PaymentsController {
  constructor(
    private readonly listPaymentsUseCase: ListPaymentsUseCase,
    private readonly findPaymentUseCase: FindPaymentUseCase,
    private readonly updatePaymentUseCase: UpdatePaymentUseCase,
    private readonly markPaymentAsPaidUseCase: MarkPaymentAsPaidUseCase,
    private readonly refundPaymentUseCase: RefundPaymentUseCase,
    private readonly listPaymentsMineUseCase: ListPaymentsMineUseCase
  ) { }

  @Get()
  @Auth()
  @UseInterceptors(new SerializeInterceptor(PaymentResponseDto))
  @ApplySwagger(PaymentsSwagger.list)
  async list(
    @AuthUser() user: any,
    @Query() query: ListPaymentsDto,
  ) {
    return this.listPaymentsUseCase.execute(
      {
        page: Math.max(Number(query.page ?? 1), 1),
        limit: Math.min(Math.max(Number(query.limit ?? 10), 1), 100),
        subscriptionId: query.subscriptionId ? Number(query.subscriptionId) : undefined,
        status: query.status,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
        filters: {},
      },
      user,
    );
  }

  @Get('me')
  @Auth()
  @UseInterceptors(new SerializeInterceptor(PaymentResponseDto))
  @ApplySwagger(PaymentsSwagger.listMine)
  async listMine(
    @AuthUser() user: any,
    @Query() query: ListPaymentsDto,
  ) {
    return this.listPaymentsUseCase.execute(
      {
        page: Math.max(Number(query.page ?? 1), 1),
        limit: Math.min(Math.max(Number(query.limit ?? 10), 1), 100),
        status: query.status,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
        filters: {},
      },
      user,
    );
  }

  @Get(':id')
  @Auth()
  @UseInterceptors(new SerializeInterceptor(PaymentResponseDto))
  @ApplySwagger(PaymentsSwagger.findById)
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: any,
  ) {
    return this.findPaymentUseCase.execute(id, user);
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