import { Injectable } from '@nestjs/common';
import JsonDB from 'node-json-db';

import { Task } from '../models/task';
import { TasksJsonDB } from '../models/tasks-json-db';

@Injectable()
export class TasksService {
  constructor(private _taskDb: JsonDB) {}

  addOne(task: Task) {
    this._taskDb.push(`/${task.guid}`, task);
  }

  getAll(): Task[] {
    const tasks: TasksJsonDB = this._taskDb.getData('/');
    return Object.keys(tasks).map(guid => tasks[guid]);
  }

  getSingle(guid: string): Task {
    return this._taskDb.getData(`/${guid}`);
  }

  create(task: Task) {
    this._taskDb.push(`/${task.guid}`, task);
  }

  complete(guid: string) {
    this._taskDb.push(`/${guid}`, { isDone: true }, false);
  }

  unComplete(guid: string) {
    this._taskDb.push(`/${guid}`, { isDone: false }, false);
  }

  favor(guid: string) {
    this._taskDb.push(`/${guid}`, { isFavor: true }, false);
  }

  unFavor(guid: string) {
    this._taskDb.push(`/${guid}`, { isFavor: false }, false);
  }

  remove(guid: string) {
    this._taskDb.delete(`/${guid}`);
  }
}
