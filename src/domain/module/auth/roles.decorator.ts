/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/domain/entities/roles.enum';

export const ROLES_KEY = 'roles';
export const NeedRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
