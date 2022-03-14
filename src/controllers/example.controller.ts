import { Request, Response } from 'express';
import { HTTP_CODES } from '../models/enums/http-codes';
import { ExampleCmd } from '../models/cmds/example.cmd';
import { ExampleFilter } from '../models/filters/example.filter';
import { IExampleService } from '../services/interfaces';
import container from '../services/inversify.config';
import { TYPES } from '../services/types/types';

const _exampleService = container.get<IExampleService>(TYPES.ExampleService);

async function exampleWithCmd(req: Request, res: Response, payload: ExampleCmd) {
  return _exampleService.exampleWithCmd(payload).then((data: unknown) => {
    return res.status(HTTP_CODES.OK).json(data);
  });
}

async function exampleWithFilters(req: Request, res: Response, payload: ExampleFilter) {
  return _exampleService.exampleWithFilter(payload).then((data: unknown) => {
    return res.status(HTTP_CODES.OK).json(data);
  });
}

async function exampleOfTransaction(req: Request, res: Response, payload: ExampleCmd) {
  return _exampleService.exampleOfTransaction(payload).then((data: unknown) => {
    return res.status(HTTP_CODES.OK).json(data);
  });
}

export const ExamplesController = {
  exampleWithCmd,
  exampleWithFilters,
  exampleOfTransaction
};
