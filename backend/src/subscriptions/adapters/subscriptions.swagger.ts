import { CreateSubscriptionDto, UpdateSubscriptionDto, SubscriptionResponseDto } from "./dto";

export const SubscriptionsSwagger = {

  create: {
    summary: 'Create a new subscription (Admin only)',
    bearerAuth: true,
    bodyType: CreateSubscriptionDto,
    roles: ['admin'],
    responseType: SubscriptionResponseDto
  },

  findAll: {
    summary: 'List all subscriptions (Paginated)',
    bearerAuth: true,
    responseType: SubscriptionResponseDto,
    queryParams: [
      { name: 'page', required: false, example: 1 },
      { name: 'limit', required: false, example: 10 },
      { name: 'search', required: false, example: '1' },
      { name: 'sortBy', required: false, example: 'id' },
      { name: 'sortOrder', required: false, example: 'ASC' }
    ],
  },

  findById: {
    summary: 'Get subscription by ID',
    bearerAuth: true,
    param: {
      name: 'id',
      type: Number,
      example: 1
    },
    responseType: SubscriptionResponseDto
  },

  update: {
    summary: 'Update subscription by ID (Admin only)',
    bearerAuth: true,
    bodyType: UpdateSubscriptionDto,
    roles: ['admin'],
    param: {
      name: 'id',
      type: Number,
      example: 1
    },
    responseType: SubscriptionResponseDto
  }
};