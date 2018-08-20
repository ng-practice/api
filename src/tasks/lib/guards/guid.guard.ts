import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';

import { CurrentHttpRequest } from '../utils/current-http-request';

@Injectable()
export class GuidGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = new CurrentHttpRequest(context);

    if (request.params.guid) {
      return true;
    }

    throw new BadRequestException(
      `[${request.method} REJECTED]: The parameter "guid" is missing.`
    );
  }
}
