import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User, UserStatus } from 'src/domain/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
export type AuthTokens = AccessToken & RefreshToken;

export type AccessToken = {
  access_token: string;
  access_token_ttl: number;
};

export type AuthInfo = {
  tokens: AuthTokens;
  user: User;
};

export type RefreshToken = {
  refresh_token: string;
  refresh_token_ttl: number;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async authenticateUser(
    phoneNumber: string,
    password: string,
  ): Promise<User> {
    const user = await this.userService.findByPhoneNumber(
      phoneNumber,
    );
    if (!user) {
      throw new UnauthorizedException(`user not found`);
    }

    if (!this.userService.checkPassword(user, password)) {
      throw new UnauthorizedException(`invalid password`);
    }

    if (user.status !== UserStatus.Active) {
      throw new UnauthorizedException(`Your Account has been suspended`);
    }
    return user;
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    const user = new User(await this.userService.findByUuid(payload.sub));
    if (!user) {
      console.log('hellooo')
      throw new UnauthorizedException();
    }

    return user;
  }

  login(user: User): AuthInfo {
    const payload = {
      sub: user.uuid,
    };
    const accessTokenTTL: number = this.configService.get<number>('jwt.auth.ttl');
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.auth.secret'),
      expiresIn: accessTokenTTL,
    });
    const refreshTokenTTL: number =
      this.configService.get<number>('jwt.refresh.ttl');
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.refresh.secret'),
      expiresIn: refreshTokenTTL,
    });
    return {
      tokens: {
        access_token: accessToken,
        access_token_ttl: accessTokenTTL,
        refresh_token: refreshToken,
        refresh_token_ttl: refreshTokenTTL,
      },
      user: user,
    };
  }
}
