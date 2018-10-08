import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import {
  ApiImplicitBody,
  ApiUseTags
} from '../../node_modules/@nestjs/swagger';
import { GuidGuard } from './lib/guards/guid.guard';
import { TasksService } from './lib/tasks.service';
import { Task } from './models/task';

function bailOut(err: HttpException) {
  throw err;
}

@ApiUseTags('Taskboard')
@Controller('tasks')
export class TasksController {
  constructor(private _tasks: TasksService) {}

  @Get()
  all() {
    return this._tasks.getAll();
  }

  @Get(':guid?')
  @UseGuards(GuidGuard)
  single(@Param('guid') guid: string) {
    return this._tasks
      .getSingle(guid)
      .ifLeft(bailOut)
      .extract();
  }

  @Post()
  @ApiImplicitBody({ name: 'Task', type: Task })
  create(@Body() task: Task) {
    return this._tasks
      .addOne(task)
      .ifLeft(bailOut)
      .extract();
  }

  @Delete(':guid?')
  @UseGuards(GuidGuard)
  remove(@Param('guid') guid: string) {
    return this._tasks.remove(guid).ifLeft(bailOut);
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
