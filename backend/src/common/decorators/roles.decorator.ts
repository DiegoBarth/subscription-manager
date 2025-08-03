import { applyDecorators } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

export function Roles(...roles: string[]) {
   const Roles = (...roles: string[]) => SetMetadata('roles', roles);
   
   return applyDecorators(
      Roles(...roles)
   );
}
