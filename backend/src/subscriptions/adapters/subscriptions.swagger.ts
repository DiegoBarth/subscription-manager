import { UserRole } from "src/users/domain/enums";
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
  SubscriptionResponseDto,
  SubscribeSubscriptionDto,
  CancelSubscriptionDto
} from "./dto";

export const SubscriptionsSwagger = {

  create: {
    summary: 'Create a new subscription (Admin only)',
    bearerAuth: true,
    bodyType: CreateSubscriptionDto,
    roles: [UserRole.ADMIN],
    responseType: SubscriptionResponseDto
  },

  findAll: {
    summary: 'List all subscriptions (Admin only)',
    bearerAuth: true,
    roles: [UserRole.ADMIN],
    responseType: SubscriptionResponseDto,
    queryParams: [
      { name: 'page', required: false, example: 1 },
      { name: 'limit', required: false, example: 10 },
      { name: 'search', required: false, example: 'active' },
      { name: 'customerId', required: false, example: 1 },
      { name: 'planId', required: false, example: 2 },
      { name: 'status', required: false, example: 'active' },
      { name: 'sortBy', required: false, example: 'created_at' },
      { name: 'sortOrder', required: false, example: 'DESC' }
    ],
  },

  findById: {
    summary: 'Get subscription by ID (Admin only)',
    bearerAuth: true,
    roles: [UserRole.ADMIN],
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
    roles: [UserRole.ADMIN],
    param: {
      name: 'id',
      type: Number,
      example: 1
    },
    responseType: SubscriptionResponseDto
  },

  subscribe: {
    summary: 'Subscribe authenticated customer to a plan',
    bearerAuth: true,
    bodyType: SubscribeSubscriptionDto,
    responseType: SubscriptionResponseDto
  },

  cancel: {
    summary: 'Cancel one of the authenticated customer subscriptions',
    bearerAuth: true,
    bodyType: CancelSubscriptionDto,
    param: {
      name: 'id',
      type: Number,
      example: 1
    },
    responseType: SubscriptionResponseDto
  },

  findMine: {
    summary: 'List authenticated customer subscriptions',
    bearerAuth: true,
    responseType: SubscriptionResponseDto,
    queryParams: [
      { name: 'page', required: false, example: 1 },
      { name: 'limit', required: false, example: 10 },
      { name: 'status', required: false, example: 'active' },
      { name: 'sortBy', required: false, example: 'created_at' },
      { name: 'sortOrder', required: false, example: 'DESC' }
    ]
  },

  renew: {
    summary: 'Renew subscription (Admin only)',
    bearerAuth: true,
    roles: [UserRole.ADMIN],
    param: {
      name: 'id',
      type: Number,
      example: 1
    },
    responseType: SubscriptionResponseDto
  }

};