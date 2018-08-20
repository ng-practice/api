import { HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { GuidGuard } from './lib/guards/guid.guard';
import { TasksService } from './lib/tasks.service';
import { TasksController } from './tasks.controller';

jest.mock('./lib/tasks.service');

describe('API: Tasks', () => {
  let controller: TasksController;
  let tasks: jest.Mock<TasksService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService, GuidGuard]
    }).compile();

    controller = module.get(TasksController);
    tasks = module.get(TasksService);
  });

  describe('GET single task', () => {
    describe('When no id is given', () => {
      it('should yield code 400', () => {
        const error = controller.single(undefined) as HttpException;
        expect(error.getStatus()).toBe(400);
      });
    });

    describe('When given id could not be found', () => {
      it('should yield code 201', () => {});
    });
  });

  describe('DELETE task', () => {
    describe('When no guid is given', () => {
      beforeEach(() =>
        tasks.mockImplementationOnce(() => ({
          remove: () => null
        })));

      it('should yield error code 400', () => {});
    });
  });

  afterEach(() => jest.clearAllMocks());
});
