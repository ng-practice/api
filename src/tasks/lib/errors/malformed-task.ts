import { NotFoundException } from '@nestjs/common';

export class MalformedTask extends NotFoundException {
  constructor() {
    super(
      'Can not create task. Please provide a single task object having ' +
        'at least a "guid" and a "title".'
    );
  }
}
