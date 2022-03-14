import { Request, Response } from 'express';
import { BaseError } from '../errors/base.error';
import { HTTP_CODES } from '../../models/enums/http-codes';
import { HTTP_METHODS } from '../../models/enums/http-methods';
import { logger } from '../logger/CustomLogger';

export function handlerError(err: BaseError, req: Request, res: Response, next: any): void {
  let log: string;
  log = `##START## #Error name: ${err.name} #Error message: ${err.message}`;
  const bodyError500 = { message: 'Ops! Ocurrio un error. Intente nuevamente.' };
  if (!err.httpCode || err.httpCode !== HTTP_CODES.BAD_REQUEST) {
    log = `${log}\n#stack trace: ${err.stack}`;
    logger.error(`${log}\n##END##`);
    res.status(HTTP_CODES.INTERNAL_ERROR).json(bodyError500);
    return;
  }
  if (err.errors) {
    log = `${log} #Error errors:`;
    err.errors.forEach((e) => (log = `${log} \n \t${e}`));
  }

  // Si es una mala petición, entonces imprimo body o params según sea POST o GET
  if (err.httpCode === HTTP_CODES.BAD_REQUEST) {
    if (req.method === HTTP_METHODS.POST) {
      log = `${log} \n\nRequest body: ${JSON.stringify(req.body)}`;
    }

    if (req.method === HTTP_METHODS.GET) {
      log = `${log} \n\nRequest params: ${JSON.stringify(req.query)}`;
    }
  }
  logger.error(`${log}\n##END##`);
  const responseBody = { errors: err.errors, message: err.message };
  err.isHandledError ? res.status(err.httpCode).json(responseBody) : res.status(HTTP_CODES.INTERNAL_ERROR).json(bodyError500);
}
