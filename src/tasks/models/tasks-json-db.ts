import { Task } from './task';

export interface TasksJsonDB {
  [guid: string]: Task;
}
