import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../infrastructure/repositories';
import { comparePasswords } from 'src/common/utils/hash-password';

@Injectable()
export class ValidateUserUseCase {

   constructor(private readonly authRepo: AuthRepository) { }

   async execute(email: string, password: string) {
      const user = await this.authRepo.findByEmail(email);

      if(!user || !(await comparePasswords(password, user.password_hash))) {
         throw new UnauthorizedException('Invalid credentials');
      }
      
      return user;
   }
   
}