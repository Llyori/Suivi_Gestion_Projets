/* eslint-disable prettier/prettier */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OnlyGuestException } from '../exceptions/only-guest.exception';

@Injectable()
export class GuestGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return this.denyAuthenticated(context);
  }

  async denyAuthenticated(context: ExecutionContext): Promise<boolean> {
    try {
      const canActivate = await super.canActivate(context);
      if (canActivate) {
        throw new OnlyGuestException();
      }
      return true;
    } catch (e) {
      if (
        e instanceof UnauthorizedException &&
        !(e instanceof OnlyGuestException)
      ) {
        return true;
      }
      throw e;
    }
  }
}
