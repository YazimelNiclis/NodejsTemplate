import { plainToClass } from 'class-transformer';
import { StoreProcedureDb } from 'oracle-sp-types-c';
import { Connection } from 'oracledb';
import { StoredProcedureExecutionError } from '../errors/stored-procedure-execution.error';
import { SP_PARAM_TYPES } from './sp-param-types.enum';
import { SpResult } from './sp-result';

/**
 * #### Clase que encapsula librería de SPs implementada en CIDS.
 *
 * #### Agrega parámetros por defecto esperados por BD según tipo de dato.
 *
 * #### Las respuesta de BD se pueden mapear a:
 *    * toUniqueResult(): un único resultado.
 *    * toListResult(): una lista de resultados.
 *    * toSpResult(): para aquellos SPs que generen un cambio de estado en la BD.
 */
export class StoredProcedure {
  private readonly name: string;
  private readonly user: string;
  private readonly returnType: any;
  private readonly connection: Connection;

  private params: any[] = [];

  constructor(name: string, returnType: any, connection?: Connection) {
    // this.user = '';
    // this.name = `${this.user}.${name}`;
    this.name = `${name}`;
    this.returnType = returnType;
    this.connection = connection;
  }

  public addParam(value: any, paramType: SP_PARAM_TYPES) {
    switch (paramType) {
      case SP_PARAM_TYPES.STRING:
        value && value !== '' ? this.params.push(value) : this.params.push(null);
        break;
      case SP_PARAM_TYPES.NUMBER:
        value ? this.params.push(value) : this.params.push(null);
        break;
      case SP_PARAM_TYPES.BOOLEAN:
        value ? this.params.push('S') : this.params.push('N');
        break;
      case SP_PARAM_TYPES.DATE:
        value ? this.params.push(new Date(value)) : this.params.push(null);
        break;
      default:
        break;
    }
    return this;
  }

  public addParamCursor() {
    this.params.push('S');
    return this;
  }

  private getStoredProcedureDB(name: string, params: any[]): StoreProcedureDb {
    return new StoreProcedureDb(this.name, this.params).cursorAtLast();
  }

  public async toListResult(): Promise<any> {
    const sp = this.getStoredProcedureDB(this.name, this.params);
    try {
      const spResult: unknown[] = await sp.executeSp();
      if (spResult === undefined || spResult === null) {
        throw new StoredProcedureExecutionError(`Proceso almacenado no terminó con éxito. Error: ${sp.execution}`);
      }
      const result = plainToClass(this.returnType, spResult, {
        excludeExtraneousValues: true
      });
      return result;
    } catch (e) {
      throw new StoredProcedureExecutionError(`Error al ejecutar proceso almacenado: ${sp.execution}`);
    }
  }

  public async toUniqueResult(): Promise<any> {
    const sp = this.getStoredProcedureDB(this.name, this.params);
    try {
      const spResult = await sp.executeSp();
      if (!spResult) {
        throw new StoredProcedureExecutionError(`Proceso almacenado no terminó con éxito. Error: ${sp.execution}`);
      }
      let data = {};
      if (spResult && Array.isArray(spResult) && spResult.length > 0) data = spResult[0];
      const result = plainToClass(this.returnType, data, {
        excludeExtraneousValues: true
      });
      return result;
    } catch (e) {
      throw new StoredProcedureExecutionError(`Error al ejecutar proceso almacenado: ${sp.execution}`);
    }
  }

  public async toSpResult(): Promise<SpResult> {
    if (!this.connection) {
      throw new StoredProcedureExecutionError(`Es requerida una conexión para ejecutar un SP transaccional`);
    }
    const sp = this.getStoredProcedureDB(this.name, this.params);
    try {
      const spResult: unknown[] = await sp.executeTransactionalSp(this.connection);
      const result: SpResult[] = plainToClass(SpResult, spResult, {
        excludeExtraneousValues: true
      });
      if (result[0].message !== 'OK') {
        throw new StoredProcedureExecutionError(`Proceso almacenado no terminó con éxito. Error: ${result[0].error}`);
      }
      return result[0];
    } catch (e) {
      throw new StoredProcedureExecutionError(`Error al ejecutar proceso almacenado: ${sp.execution}`);
    }
  }
}
