import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from 'src/payments/domain/enums/payment-method.enum';

export class MarkPaymentAsPaidDto {

  @IsEnum(PaymentMethod)
  @ApiProperty({
    example: PaymentMethod.PIX,
    enum: PaymentMethod,
  })
  paymentMethod!: PaymentMethod;

}