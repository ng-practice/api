import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '../../node_modules/@nestjs/swagger';
import { TasksService } from './lib/tasks.service';

@ApiUseTags('Task Board')
@Controller('tasks')
export class TasksController {
  constructor(private _tasks: TasksService) {}

  @Get()
  all() {
    return this._tasks.getAll();
  }
}
