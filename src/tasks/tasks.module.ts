import { Module } from '@nestjs/common';
import { join } from 'path';
import { GuidGuard } from './lib/guards/guid.guard';
import { TasksService } from './lib/tasks.service';
import { TaskController } from './task.controller';
import { TasksController } from './tasks.controller';

// tslint:disable-next-line:no-var-requires
const JsonDB = require('node-json-db');

const database = join(__dirname, '..', '..', 'database');

@Module({
  controllers: [TasksController, TaskController],
  providers: [
    {
      provide: TasksService,
      useValue: new TasksService(new JsonDB(`${database}/tasks`, true, true))
    },
    GuidGuard
  ]
})
export class TasksModule {}
