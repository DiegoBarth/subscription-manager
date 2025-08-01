import { Expose } from 'class-transformer';

export class TokenResponseDto {

   @Expose()
   access_token: string;

}