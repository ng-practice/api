import { BadRequestException } from '@nestjs/common';

export class MissingGuid extends BadRequestException {
  constructor() {
    super('Please provide a valid Guid.');
  }
}
