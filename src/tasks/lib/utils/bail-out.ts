import { HttpException } from '@nestjs/common';

export function bailOut(err: HttpException) {
  throw err;
}
