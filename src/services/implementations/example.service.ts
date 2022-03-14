import { inject, injectable } from 'inversify';
import { BusinessError } from '../../core/errors/business.error';
import { ExampleCmd } from '../../models/cmds/example.cmd';
import { ExampleFilter } from '../../models/filters/example.filter';
import { IExampleRepository } from '../repositories/example.repository';
import { IExampleService } from '../interfaces/IExampleService';
import { TYPES } from '../types/types';
import { ExampleResult } from '../../models/results/example.result';
import { UnsuccessfulTransactionError } from '../../core/errors/unsuccessful-transaction.error';
import { ConnectionCloseError } from '../../core/errors/connection-close.error';

const oracledb = require('oracledb');

@injectable()
export class ExampleService implements IExampleService {
  private readonly _exampleRepository: IExampleRepository;

  constructor(@inject(TYPES.ExampleRepository) respository: IExampleRepository) {
    this._exampleRepository = respository;
  }

  async exampleWithCmd(payload: ExampleCmd): Promise<ExampleResult> {
    payload = null;
    payload.email;
    return this._exampleRepository.exampleWithCmd(payload).then((result) => {
      if (!result.id) {
        // Ejemplo de como tirar un Error de negocio al validar cierta regla de negocio.
        throw new BusinessError('No puede hacer esa operación');
      }
      return result;
    });
  }

  async exampleWithFilter(payload: ExampleFilter): Promise<ExampleResult[]> {
    return this._exampleRepository.exampleWithFilter(payload).then((result) => {
      return result;
    });
  }

  async exampleOfTransaction(payload: ExampleCmd): Promise<number> {
    let connection;

    try {
      // Inicio una conexión/transacción
      connection = await oracledb.getConnection();

      // Ejecuto el primer SP transaccional
      const transactionalSP1Result = await this._exampleRepository.exampleTransactionalSP1(payload, connection);

      // Ejecuto el segundo SP transaccional
      const transactionalSP2Result = await this._exampleRepository.exampleTransactionalSP2(payload, connection);

      // Commiteo la transacción
      await connection.commit();

      return transactionalSP2Result;
    } catch (e) {
      throw new UnsuccessfulTransactionError();
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          throw new ConnectionCloseError();
        }
      }
    }
  }
}
