import {
  applyDecorators,
  UseGuards,
  createParamDecorator,
  ExecutionContext,
  SetMetadata
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/infrastructure';

export function Auth(...roles: string[]) {

  const decorators = [
    UseGuards(AuthGuard('jwt'), RolesGuard)
  ];

  if (roles.length) {
    decorators.push(SetMetadata('roles', roles));
  }

  return applyDecorators(...decorators);
}

export const AuthUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);