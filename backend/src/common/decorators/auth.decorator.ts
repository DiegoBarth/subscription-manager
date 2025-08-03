import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/infrastructure';

export function Auth() {
   return applyDecorators(
      UseGuards(AuthGuard('jwt'), RolesGuard)
   );
}