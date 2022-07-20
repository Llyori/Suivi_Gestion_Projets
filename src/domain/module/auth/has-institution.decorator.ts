// /* eslint-disable prettier/prettier */
// import {
//     applyDecorators,
//     CallHandler,
//     ExecutionContext,
//     Injectable,
//     NestInterceptor,
//     NotFoundException,
//     UnauthorizedException,
//     UseInterceptors,
//   } from '@nestjs/common';
//   import { Observable } from 'rxjs';
  
//   @Injectable()
//   export class HasIntitutionInterceptor implements NestInterceptor {
//     constructor(private institutionService: InstitutionService) {}
//     async intercept(
//       context: ExecutionContext,
//       next: CallHandler,
//     ): Promise<Observable<any>> {
//       const req = context.switchToHttp().getRequest();
//       if (!req.params.inst) {
//         throw new NotFoundException();
//       }
//       const instCode = req.params.inst;
//       const inst = await this.institutionService.findInstitutionByCode(instCode);
//       if (!inst) {
//         throw new NotFoundException();
//       }
  
//       if (req.user && inst.id != req.user.institution.id) {
//         throw new UnauthorizedException();
//       }
//       req.inst = inst;
//       return next.handle();
//     }
//   }
  
//   export function HasInstitution() {
//     return applyDecorators(UseInterceptors(HasIntitutionInterceptor));
//   }
  