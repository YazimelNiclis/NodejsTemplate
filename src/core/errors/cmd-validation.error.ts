import { ValidationError } from 'class-validator';
import { HTTP_CODES } from '../../models/enums/http-codes';
import { BaseError } from './base.error';

/**
 * Clase que representa un error en la validación de petición
 */
export class CmdValidationError extends BaseError {
  constructor(errors: ValidationError[]) {
    super();
    this.name = 'VALIDATION_ERROR';
    this.httpCode = HTTP_CODES.BAD_REQUEST;
    this.message = 'Revise los parámetros de la petición';

    this.errors = CmdValidationError.getErrorsAsString(errors.map((e) => e.constraints));
  }

  static getErrorsAsString(errorsObject: { [type: string]: string }[]): string[] {
    const err: string[] = [];
    errorsObject.forEach((error) => {
      for (let [k, v] of Object.entries(error)) {
        err.push(`${v}`);
      }
    });
    return err;
  }
}
