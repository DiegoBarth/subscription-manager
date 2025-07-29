import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { user } from '@prisma/client';

@Injectable()
export class AuthService {
   constructor(private readonly usersService: UsersService) { }

   async validateUser(email: string, password: string): Promise<user | null> {
      const user = await this.usersService.findByEmail(email);
      if (!user) return null;

      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      if (!passwordMatch) return null;

      return user;
   }
}
