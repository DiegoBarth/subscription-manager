import {
  Body,
  Query,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  UseInterceptors
} from '@nestjs/common';

import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
  SubscriptionResponseDto,
  ListSubscriptionsDto,
  SubscribeSubscriptionDto,
  CancelSubscriptionDto,
  ListUserSubscriptionsDto
} from './dto';

import {
  CreateSubscriptionUseCase,
  UpdateSubscriptionUseCase,
  ListSubscriptionsUseCase,
  SubscribeSubscriptionUseCase,
  CancelSubscriptionUseCase,
  ListUserSubscriptionsUseCase
} from '../application';

import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { ApplySwagger } from 'src/common/decorators/apply-swagger.decorator';
import { SubscriptionsSwagger } from './subscriptions.swagger';
import { Auth, AuthUser } from 'src/common/decorators';

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionsController {

  constructor(
    private readonly createSubscription: CreateSubscriptionUseCase,
    private readonly listSubscriptions: ListSubscriptionsUseCase,
    private readonly updateSubscription: UpdateSubscriptionUseCase,
    private readonly subscribeSubscription: SubscribeSubscriptionUseCase,
    private readonly cancelSubscription: CancelSubscriptionUseCase,
    private readonly listUseSubscriptions: ListUserSubscriptionsUseCase,
  ) { }

  /*
  |--------------------------------------------------------------------------
  | ADMIN ROUTES
  |--------------------------------------------------------------------------
  */

  @Post()
  @Auth('admin')
  @UseInterceptors(new SerializeInterceptor(SubscriptionResponseDto))
  @ApplySwagger(SubscriptionsSwagger.create)
  async create(@Body() dto: CreateSubscriptionDto) {
    return this.createSubscription.execute(dto);
  }

  @Get()
  @Auth()
  @UseInterceptors(new SerializeInterceptor(SubscriptionResponseDto))
  @ApplySwagger(SubscriptionsSwagger.findAll)
  async findAll(@Query() query: ListSubscriptionsDto) {

    const {
      page = '1',
      limit = '10',
      search,
      sortBy,
      sortOrder
    } = query;

    const filters: Record<string, any> = {};

    if (query.customerId) filters.customerId = Number(query.customerId);
    if (query.planId) filters.planId = Number(query.planId);
    if (query.status) filters.status = query.status;

    return this.listSubscriptions.execute({
      page: Math.max(Number(page), 1),
      limit: Math.min(Math.max(Number(limit), 1), 100),
      search,
      sortBy,
      sortOrder,
      filters
    });

  }

  @Patch(':id')
  @Auth('admin')
  @UseInterceptors(new SerializeInterceptor(SubscriptionResponseDto))
  @ApplySwagger(SubscriptionsSwagger.update)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSubscriptionDto
  ) {
    return this.updateSubscription.execute(id, dto);
  }

  /*
  |--------------------------------------------------------------------------
  | USER ROUTES
  |--------------------------------------------------------------------------
  */

  @Post('subscribe')
  @Auth()
  @UseInterceptors(new SerializeInterceptor(SubscriptionResponseDto))
  async subscribe(
    @AuthUser() user: any,
    @Body() dto: SubscribeSubscriptionDto
  ) {
    return this.subscribeSubscription.execute(user.id, dto);
  }

  @Patch(':id/cancel')
  @Auth()
  @UseInterceptors(new SerializeInterceptor(SubscriptionResponseDto))
  async cancel(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: any,
    @Body() dto: CancelSubscriptionDto
  ) {
    return this.cancelSubscription.execute(id, user.id, dto);
  }

  @Get('me')
  @Auth()
  @UseInterceptors(new SerializeInterceptor(SubscriptionResponseDto))
  async findMine(
    @AuthUser() user: any,
    @Query() query: ListUserSubscriptionsDto
  ) {

    const {
      page = '1',
      limit = '10',
      sortBy,
      sortOrder,
      status
    } = query;

    return this.listUseSubscriptions.execute({
      customerId: user.id,
      page: Math.max(Number(page), 1),
      limit: Math.min(Math.max(Number(limit), 1), 100),
      sortBy,
      sortOrder,
      status
    });

  }

}