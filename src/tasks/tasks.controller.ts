import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  all() {
    return [{ id: 1 }];
  }

  @Post()
  addOne(@Body() task) {
    return task;
  }
}
