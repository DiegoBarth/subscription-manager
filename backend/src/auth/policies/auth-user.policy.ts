import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserStatus } from "@prisma/client";

@Injectable()
export class AuthUserPolicy {
  validate(user: any) {
    if (user.deleted_at) {
      throw new UnauthorizedException('User account has been deleted');
    }

    if (user.status !== UserStatus.active) {
      throw new UnauthorizedException('User account is not active');
    }
  }
}