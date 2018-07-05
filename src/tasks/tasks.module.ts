import { Module } from '@nestjs/common';

import { TasksService } from './lib/tasks.service';
import { TasksController } from './tasks.controller';

import { join } from 'path';

// tslint:disable-next-line:no-var-requires
const JsonDB = require('node-json-db');

const database = join(__dirname, '..', '..', 'database');

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: TasksService,
      useValue: new TasksService(new JsonDB(`${database}/tasks`, true, true)),
    },
  ],
})
export class TasksModule {}
