import { NotFoundException } from '@nestjs/common';

export class NoTaskFound extends NotFoundException {
  constructor(givenGuid: string) {
    super(`Can not find task having the identifier "${givenGuid}".`);
  }
}
