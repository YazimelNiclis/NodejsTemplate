import { injectable } from 'inversify';
import { Connection } from 'oracledb';
import { StoredProcedure } from './stored-procedure';

/**
 * Clase abstracta de la cual deben heredar todos los repositorios concretos.
 */

@injectable()
export abstract class AbstractRepository {
  protected execute(spName: string, returnType: any, connection?: Connection): StoredProcedure {
    return new StoredProcedure(spName, returnType, connection);
  }
}
