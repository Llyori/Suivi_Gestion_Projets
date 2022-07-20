/* eslint-disable prettier/prettier */
import { request, Request } from 'express';
import { User } from './domain/entities/user.entity';
import { ValidationException } from './validation.exception';

export const wantJson = (req: Request) => {
  return req.accepts('html, json') === 'json' || isAjax(req) || isApi(req);
};

export const isAjax = (req: Request) => {
  return req.get('X-Requested-With') === 'XMLHttpRequest';
};

export const isApi = (req: Request) => {
  return req.get('Content-Type') === 'application/json';
};

export type Alert = Record<AlertType, string>;
export type AlertType = 'info' | 'success' | 'danger' | 'warning';


export const createNewValidationException = (
  field: string,
  message,
  constraintName = '',
) => {
  throw new ValidationException([
    {
      property: field,
      constraints: {
        [constraintName]: message,
      },
    },
  ]);
};

export const mergeOldDataWith = (res, ...data) => {
  let result = {};
  data.forEach((e) => {
    result = {
      ...result,
      ...e,
    };
  });
  res.locals['_o'] = {
    ...res.locals['_o'],
    ...result,
  };
};
