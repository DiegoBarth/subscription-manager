import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CancelSubscriptionDto {

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'User requested cancellation',
    required: false,
    description: 'Reason for subscription cancellation',
  })
  reason?: string;
}