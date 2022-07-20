import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/domain/entities/user.entity';
import { receiveMessageOnPort } from 'worker_threads';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: 'phoneNumber',
      passReqToCallback: true,
    });
  }

  async validate(req, phoneNumber: string, password: string): Promise<User> {
    try {
      const user = await this.authService.authenticateUser(
        phoneNumber,
        password,
      );
      req.user = user;
      return user;
    } catch (e) {
      //console.log(e);
      return null;
    }
  }
}
