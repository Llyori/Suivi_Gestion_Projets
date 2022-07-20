/* eslint-disable prettier/prettier */
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { User } from 'src/domain/entities/user.entity';
import { OnlyGuestException } from '../exceptions/only-guest.exception';

@Catch(OnlyGuestException)
export class OnlyGuestExceptionFilter extends BaseExceptionFilter {
  catch(exception: OnlyGuestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (exception instanceof OnlyGuestException) {
      const user: User = request.user as User;
      return response.redirect('/');
    }
    return super.catch(exception, host);
  }
}
