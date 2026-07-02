import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';

export class MarkPaymentAsPaidDto {

  @IsEnum(PaymentMethod)
  @ApiProperty({
    example: PaymentMethod.pix,
    enum: PaymentMethod,
  })
  paymentMethod!: PaymentMethod;

}