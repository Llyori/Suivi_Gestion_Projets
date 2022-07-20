import { Controller, Get } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { AuthUser } from './auth-user.decorator';

@Controller('auth')
export class AuthController {
  @Get('me')
  async me(@AuthUser() user: User): Promise<User> {
    return  user;
  }
}
