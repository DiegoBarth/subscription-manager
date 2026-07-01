import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserStatus } from "src/users/domain/enums";

@Injectable()
export class AuthUserPolicy {
  validate(user: any) {
    if (user.deleted_at) {
      throw new UnauthorizedException('User account has been deleted');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('User account is not active');
    }
  }
}