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
  ListUserSubscriptionsUseCase,
  FindSubscriptionUseCase,
  RenewSubscriptionUseCase 
} from '../application';

import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { ApplySwagger } from 'src/common/decorators/apply-swagger.decorator';
import { SubscriptionsSwagger } from './subscriptions.swagger';
import { Auth, AuthUser } from 'src/common/decorators';
import { UserRole } from 'src/users/domain/enums';

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionsController {

  constructor(
    private readonly createSubscription: CreateSubscriptionUseCase,
    private readonly listSubscriptions: ListSubscriptionsUseCase,
    private readonly findSubscription: FindSubscriptionUseCase,
    private readonly updateSubscription: UpdateSubscriptionUseCase,
    private readonly subscribeSubscription: SubscribeSubscriptionUseCase,
    private readonly cancelSubscription: CancelSubscriptionUseCase,
    private readonly listUserSubscriptions: ListUserSubscriptionsUseCase,
    private readonly renewSubscription: RenewSubscriptionUseCase
  ) { }

  /*
  |--------------------------------------------------------------------------
  | ADMIN ROUTES
  |--------------------------------------------------------------------------
  */

  @Post()
  @Auth(UserRole.ADMIN)
  @UseInterceptors(new SerializeInterceptor(SubscriptionResponseDto))
  @ApplySwagger(SubscriptionsSwagger.create)
  async create(@Body() dto: CreateSubscriptionDto) {
    return this.createSubscription.execute(dto);
  }

  @Get()
  @Auth(UserRole.ADMIN)
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
  @Auth(UserRole.ADMIN)
  @UseInterceptors(new SerializeInterceptor(SubscriptionResponseDto))
  @ApplySwagger(SubscriptionsSwagger.update)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSubscriptionDto
  ) {
    return this.updateSubscription.execute(id, dto);
  }

  @Patch(':id/renew')
  @Auth(UserRole.ADMIN)
  @UseInterceptors(new SerializeInterceptor(SubscriptionResponseDto))
  @ApplySwagger(SubscriptionsSwagger.renew)
  async renew(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.renewSubscription.execute(id);
  }

  /*
  |--------------------------------------------------------------------------
  | USER ROUTES
  |--------------------------------------------------------------------------
  */

  @Get('me')
  @Auth()
  @UseInterceptors(new SerializeInterceptor(SubscriptionResponseDto))
  @ApplySwagger(SubscriptionsSwagger.findMine)
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

    return this.listUserSubscriptions.execute({
      customerId: user.id,
      page: Math.max(Number(page), 1),
      limit: Math.min(Math.max(Number(limit), 1), 100),
      sortBy,
      sortOrder,
      status
    });
  }

  @Get(':id')
  @Auth()
  @UseInterceptors(new SerializeInterceptor(SubscriptionResponseDto))
  @ApplySwagger(SubscriptionsSwagger.findById)
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: any
  ) {
    return this.findSubscription.execute(id, user);
  }

  @Post('subscribe')
  @Auth()
  @UseInterceptors(new SerializeInterceptor(SubscriptionResponseDto))
  @ApplySwagger(SubscriptionsSwagger.subscribe)
  async subscribe(
    @AuthUser() user: any,
    @Body() dto: SubscribeSubscriptionDto
  ) {
    return this.subscribeSubscription.execute(user.id, dto);
  }

  @Patch(':id/cancel')
  @Auth()
  @UseInterceptors(new SerializeInterceptor(SubscriptionResponseDto))
  @ApplySwagger(SubscriptionsSwagger.cancel)
  async cancel(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: any
  ) {
    return this.cancelSubscription.execute(id, user.id);
  }

}