import { PaymentStatus } from "@prisma/client";
import {
  UpdatePaymentDto,
  PaymentResponseDto
} from './dto';

export const PaymentsSwagger = {
  list: {
    summary: 'List payments (filtered)',
    bearerAuth: true,
    responseType: PaymentResponseDto,
    queryParams: [
      { name: 'subscriptionId', required: false, example: 1 },
      { name: 'status', required: false, example: PaymentStatus.pending },
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
  },

  listMine: {
    summary: 'List authenticated customer payments',
    bearerAuth: true,
    responseType: PaymentResponseDto,
  },

};