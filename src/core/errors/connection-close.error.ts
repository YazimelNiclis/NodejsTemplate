import { BaseError } from './base.error';

/**
 * Clase que representa un error al cerrar una conexión con BD.
 */
export class ConnectionCloseError extends BaseError {
  constructor() {
    super();
    this.name = 'CONNECTION_BD_CLOSE_ERROR';
    this.message = 'Error al cerra conexión con BD';
  }
}
