import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateUserUseCase } from './validate-user.use-case';

@Injectable()
export class LoginUseCase {

   constructor(
      private readonly validateUser: ValidateUserUseCase,
      private readonly jwtService: JwtService,
   ) { }

   async execute(email: string, password: string) {
      const user = await this.validateUser.execute(email, password);
      const payload = { sub: user.id, email: user.email, role: user.role };
      const token = await this.jwtService.signAsync(payload);
      return { access_token: token };
   }
   
}