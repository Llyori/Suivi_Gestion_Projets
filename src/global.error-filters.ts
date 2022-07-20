/* eslint-disable prettier/prettier */
import { ArgumentsHost, Catch, HttpException, Redirect, Render, Res, UnauthorizedException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { wantJson } from './helpers';
import {
  FormMatchException,
  ValidationException,
} from './validation.exception';
export const BAD_CSRF_CODE = 'EBADCSRFTOKEN';
@Catch()
export class GlobalErrorFilter extends BaseExceptionFilter{
  async catch(exception, host: ArgumentsHost) {
    //var window: Window & typeof globalThis;
    if (exception instanceof ValidationException) {
      return this.handleValidationException(exception, host);
    }
    if(exception instanceof UnauthorizedException){
      //window.location.href = '/web/auth/logine'
    }
    if(exception instanceof QueryFailedError){
      console.log(exception.message)
    }
    // else{
    //   console.log(exception)
    // }
    const res = host.switchToHttp().getResponse();
    const req = host.switchToHttp().getRequest();
    res.status(500).send({ message: exception.message });
  }


  async handleValidationException(
    exception: ValidationException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const errors = {};
    exception.errors.forEach((e) => {
      console.log(e.constraints)
      errors[e.property] = Object.keys(e.constraints).map((v) => ({
        type: v,
        message: e.constraints[v],
      }));
    });

    // if (!wantJson(request)) {
    //   const body = request.body;
    //   if (typeof body == 'object') {
    //     const parsedBody = {};
    //     Object.keys(body).forEach((e) => {
    //       const value = body[e];
    //       if (typeof value == 'number') {
    //         parsedBody[e] = value;
    //       } else if (typeof value == 'string' && value.length > 0) {
    //         if (e != 'password' && e.charAt(0) != '_') {
    //           parsedBody[e] = value;
    //         }
    //       }
    //     });
    //   }
    //   return { request, response };
    // }
    return (
      response
        .status(status)
        // you can manipulate the response here
        .json({
          statusCode: status,
          message: exception.message,
          error: exception.message,
          errors: errors,
        })
    );
  }
}
