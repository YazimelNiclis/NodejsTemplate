import { HTTP_CODES } from '../../models/enums/http-codes';
import { BaseError } from './base.error';

/**
 * Clase que representa un error en alguna validación de negocio.
 * De esta clase deben heredar cualquier error lanzado en la capa de servicios.
 */
export class BusinessError extends BaseError {
  constructor(message: string) {
    super();
    this.name = 'BUSINESS_ERROR';
    this.httpCode = HTTP_CODES.BAD_REQUEST;
    this.message = message;
  }
}
