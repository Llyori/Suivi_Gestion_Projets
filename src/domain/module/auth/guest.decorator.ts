/* eslint-disable prettier/prettier */
import { applyDecorators, UseFilters, UseGuards } from '@nestjs/common';
import { OnlyGuestExceptionFilter } from './exception-filters/only-guest.exception-filters';
import { GuestGuard } from './guards/guest-guards';
import { Public } from './is.public.decorators';

export function Guest() {
  return applyDecorators(
    Public(),
    UseFilters(OnlyGuestExceptionFilter),
    UseGuards(GuestGuard),
  );
}
