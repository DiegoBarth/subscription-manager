import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdatePlanStatusDto {
  @ApiProperty({
    example: true,
    description: 'Plan active status',
  })
  @IsBoolean()
  active!: boolean;
}