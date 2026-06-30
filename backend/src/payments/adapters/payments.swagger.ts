import { PaymentStatus } from 'src/payments/domain/enums/payment-status.enum';
import { PaymentMethod } from 'src/payments/domain/enums/payment-method.enum';
import {
  CreatePaymentDto,
  UpdatePaymentDto,
  PaymentResponseDto,
  ListPaymentsDto
} from './dto';

export const PaymentsSwagger = {
  create: {
    summary: 'Create a new payment',
    bearerAuth: true,
    bodyType: CreatePaymentDto,
    responseType: PaymentResponseDto,
  },

  list: {
    summary: 'List payments (filtered)',
    bearerAuth: true,
    responseType: PaymentResponseDto,
    queryParams: [
      { name: 'subscriptionId', required: false, example: 1 },
      { name: 'status', required: false, example: PaymentStatus.PENDING },
    ],
  },

  findById: {
    summary: 'Get payment by ID',
    bearerAuth: true,
    param: {
      name: 'id',
      type: Number,
      example: 1,
    },
    responseType: PaymentResponseDto,
  },

  update: {
    summary: 'Update payment (admin/ops)',
    bearerAuth: true,
    param: {
      name: 'id',
      type: Number,
      example: 1,
    },
    bodyType: UpdatePaymentDto,
    responseType: PaymentResponseDto,
  },

  markAsPaid: {
    summary: 'Mark payment as paid',
    bearerAuth: true,
    param: {
      name: 'id',
      type: Number,
      example: 1,
    },
    responseType: PaymentResponseDto,
  },

  refund: {
    summary: 'Refund payment',
    bearerAuth: true,
    param: {
      name: 'id',
      type: Number,
      example: 1
    },
    responseType: PaymentResponseDto
  }

};