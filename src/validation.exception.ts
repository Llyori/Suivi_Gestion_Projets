/* eslint-disable prettier/prettier */
import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends UnprocessableEntityException {
  constructor(public readonly errors: ValidationError[], message = null) {
    super(message);
  }
}

export class FormMatchException extends ConflictException {
  constructor(public readonly field = null, message = null) {
    super(message);
  }
}
