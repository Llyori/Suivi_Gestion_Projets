/* eslint-disable prettier/prettier */
import { UnauthorizedException } from '@nestjs/common';

export class OnlyGuestException extends UnauthorizedException {}
