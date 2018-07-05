import { Injectable } from '@nestjs/common';
import JsonDB from 'node-json-db';

@Injectable()
export class TasksService {
  constructor(private _taskDb: JsonDB) {}
}
