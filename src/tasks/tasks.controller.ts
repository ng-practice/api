import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete
} from '@nestjs/common';
import { TasksService } from './lib/tasks.service';
import { ApiUseTags } from '../../node_modules/@nestjs/swagger';

@ApiUseTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private _tasks: TasksService) {}

  @Get()
  all() {
    return this._tasks.getAll();
  }

  @Get(':guid')
  single(@Param('guid') guid: string) {
    return this._tasks.getSingle(guid);
  }

  @Post()
  create(@Body() task) {
    return this._tasks.addOne(task);
  }

  @Delete(':guid')
  remove(@Param('guid') guid: string) {
    return this._tasks.remove(guid);
  }

  @Put('favor/:guid')
  favor(@Param('guid') guid: string) {
    return this._tasks.favor(guid);
  }

  @Put('disfavor/:guid')
  disfavor(@Param('guid') guid: string) {
    return this._tasks.disfavor(guid);
  }

  @Put('complete/:guid')
  complete(@Param('guid') guid: string) {
    return this._tasks.complete(guid);
  }

  @Put('proceed/:guid')
  proceed(@Param('guid') guid: string) {
    return this._tasks.proceed(guid);
  }
}
