import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './lib/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private _tasks: TasksService) {}

  @Get()
  all() {
    return this._tasks.getAll();
  }

  @Get(':guid')
  single(guid: string) {
    return this._tasks.getSingle(guid);
  }

  @Post()
  create(@Body() task) {
    return this._tasks.addOne(task);
  }

  @Delete(':guid')
  remove(@Param() guid: string) {
    return this._tasks.remove(guid);
  }

  @Put('favor/:guid')
  favor(@Param() guid: string) {
    return this._tasks.favor(guid);
  }

  @Put('unFavor/:guid')
  unFavor(@Param() guid: string) {
    return this._tasks.unFavor(guid);
  }

  @Put('complete/:guid')
  complete(@Param() guid: string) {
    return this._tasks.complete(guid);
  }

  @Put('unComplete/:guid')
  unComplete(@Param() guid: string) {
    return this._tasks.unComplete(guid);
  }
}
