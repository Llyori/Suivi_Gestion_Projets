import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    try {
      return super.canActivate(context) as boolean;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException(
        'The credentials does not match our records',
      );
    }
  }
}
