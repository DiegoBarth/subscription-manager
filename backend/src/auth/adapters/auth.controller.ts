import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { LoginUseCase } from '../application';
import { LoginDto, TokenResponseDto } from './dto';

@Controller('auth')
export class AuthController {

   constructor(private readonly loginUseCase: LoginUseCase) { }

   @UseInterceptors(new SerializeInterceptor(TokenResponseDto))
   @Post('login')
   async login(@Body() dto: LoginDto) {
      return await this.loginUseCase.execute(dto.email, dto.password);
   }

}