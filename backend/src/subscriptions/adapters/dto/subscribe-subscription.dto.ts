import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubscribeSubscriptionDto {

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: 2,
    description: 'ID of the plan the user wants to subscribe to',
  })
  planId: number;

}