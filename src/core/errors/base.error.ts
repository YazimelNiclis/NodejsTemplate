import { HTTP_CODES } from '../../models/enums/http-codes';

/**
 * Clase base de donde heredan todos los tipos de Error
 */

export class BaseError extends Error {
  httpCode: HTTP_CODES;
  errors: string[] | undefined;
  isHandledError = true;

  constructor(errors?: string[]) {
    super();
    this.name = 'ERROR';
    this.httpCode = HTTP_CODES.INTERNAL_ERROR;
    this.errors = errors;
    this.message = `Ocurrió un error inesperado. Vuelva a intentarlo por favor`;
  }
}
