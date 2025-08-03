import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
   
   @IsString()
   @IsNotEmpty()
   @ApiProperty({ example: 'bc014fdc844a742b2fc84d06121290a96fd799b5923989ccd7098b89764f7a152a821ae8f8704ce0499032' })
   refresh_token: string;

}