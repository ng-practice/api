import { HttpException, Injectable } from '@nestjs/common';
import JsonDB from 'node-json-db';
import { Either } from 'pure-ts/adts/Either';
import { Maybe } from 'pure-ts/adts/Maybe';
import { Task } from '../models/task';
import { TasksJsonDB } from '../models/tasks-json-db';
import { MalformedTask, MissingGuid, NoTaskFound } from './errors';
import { tryTo } from './utils';

@Injectable()
export class TasksService {
  constructor(private _taskDb: JsonDB) {}

  addOne(task: Task): Either<HttpException, Task> {
    task = task || ({} as Task);

    return Maybe.of(task.guid)
      .toEither(new MalformedTask())
      .chain(() =>
        tryTo<Task>({
          resolve: () => this._create(task),
          orYield: () => new MalformedTask()
        })
      );
  }

  updateOne(task: Task): Either<HttpException, Task> {
    task = task || ({} as Task);

    return Maybe.of(task.guid)
      .toEither(new MalformedTask())
      .chain(() =>
        tryTo<Task>({
          resolve: () => this._update(task),
          orYield: () => new MalformedTask()
        })
      );
  }

  getAll(): Task[] {
    const tasks: TasksJsonDB = this._taskDb.getData('/');
    return Object.keys(tasks).map(guid => tasks[guid]);
  }

  getSingle(guid: string): Either<HttpException, Task> {
    return Maybe.of(guid)
      .toEither(new MissingGuid())
      .chain(value =>
        tryTo<Task>({
          resolve: () => this._taskDb.getData(`/${value}`),
          orYield: () => new NoTaskFound(guid)
        })
      );
  }

  complete(guid: string) {
    this._taskDb.push(
      `/${guid}`,
      { isComplete: true, isInProgress: false },
      false
    );
  }

  proceed(guid: string) {
    this._taskDb.push(
      `/${guid}`,
      { isInProgress: true, isComplete: false },
      false
    );
  }

  favor(guid: string) {
    this._taskDb.push(`/${guid}`, { isFavorite: true }, false);
  }

  disfavor(guid: string) {
    this._taskDb.push(`/${guid}`, { isFavorite: false }, false);
  }

  remove(guid: string) {
    return this.getSingle(guid).ifRight(() => this._taskDb.delete(`/${guid}`));
  }

  private _create(task: Task): Task {
    this._taskDb.push(`/${task.guid}`, {
      ...task,
      isInProgress: false,
      isComplete: false
    });

    return task;
  }

  private _update(task: Task): Task {
    this._taskDb.push(`/${task.guid}`, task);
    return task;
  }
}
