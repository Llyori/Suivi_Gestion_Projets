import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../jwt-payload.interface';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req) => {
        const contentType = req.get('Content-Type');
        if (contentType && req.get('Content-Type') === 'application/json') {
          const Token = req.get('Authorization');
          if (!Token) {
            console.log(req.session);
            return req.session.token;
          }
          return Token;
        }
        if (!req || !req.session || !req.session.token) return null;
        return req.session.token;
      },
      secretOrKey: configService.get<string>('jwt.auth.secret'),
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  validate(payload: JwtPayload): Promise<User> {
    return this.authService.verifyPayload(payload);
  }
}
