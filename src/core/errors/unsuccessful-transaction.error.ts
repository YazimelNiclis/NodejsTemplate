import { BaseError } from './base.error';

/**
 * Clase que representa un error durante una transacción con BD
 */
export class UnsuccessfulTransactionError extends BaseError {
  constructor() {
    super();
    this.name = 'UNSUCCESSFUL_DB_TRANSACTION_ERROR';
    this.message = 'Transacción no exitosa';
  }
}
