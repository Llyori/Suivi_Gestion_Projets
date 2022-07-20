import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { AuthUser } from '../auth-user.decorator';
import { AuthInfo, AuthService } from '../auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Public } from '../is.public.decorators';

@Controller('auth/login')
export class LoginController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  @Public()
  @Post()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@AuthUser() user: User): Promise<AuthInfo> {
    return this.authService.login(user);
  }
}
