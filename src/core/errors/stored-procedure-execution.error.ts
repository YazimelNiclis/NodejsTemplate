import { BaseError } from './base.error';

/**
 * Clase que representa un error al ejecutar un SP.
 */
export class StoredProcedureExecutionError extends BaseError {
  constructor(message: string) {
    super();
    this.name = 'STORED_PROCEDURE_EXECUTION_ERROR';
    this.message = message;
  }
}
