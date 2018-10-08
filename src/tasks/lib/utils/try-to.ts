import { HttpException } from '@nestjs/common';
import { Either } from 'pure-ts/adts/Either';

export function tryTo<T>(action: {
  resolve: () => T;
  orYield: (err: Error) => HttpException;
}): Either<HttpException, T> {
  return Either.encase(action.resolve).mapLeft(action.orYield);
}
