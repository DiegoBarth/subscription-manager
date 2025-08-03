import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {

   @Expose()
   @ApiProperty({ example: 'I1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksImVtYWlsIjoi' })
   access_token: string;


   @Expose()
   @ApiProperty({ example: '2fc84d06121290a96f438b53cdb5a2b475d' })
   refresh_token:string;

}