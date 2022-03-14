import { injectable } from 'inversify';
import { AbstractRepository } from '../../core/repository/abstract.repository';
import { SP_PARAM_TYPES } from '../../core/repository/sp-param-types.enum';
import { ExampleCmd } from '../../models/cmds/example.cmd';
import { ExampleFilter } from '../../models/filters/example.filter';
import { ExampleResult } from '../../models/results/example.result';
import { Connection } from 'oracledb';
import { SpResult } from '../../core/repository/sp-result';

export interface IExampleRepository {
  exampleWithCmd(payload: ExampleCmd): Promise<ExampleResult>;
  exampleWithFilter(payload: ExampleFilter): Promise<ExampleResult[]>;
  exampleTransactionalSP1(payload: ExampleCmd, connection: Connection): Promise<number>;
  exampleTransactionalSP2(payload: ExampleCmd, connection: Connection): Promise<number>;
}

@injectable()
export class ExampleRepository extends AbstractRepository implements IExampleRepository {
  async exampleWithCmd(payload: ExampleCmd): Promise<ExampleResult> {
    const sp = this.execute('PR_SP_NAME', ExampleResult).addParam(payload.email, SP_PARAM_TYPES.STRING).addParam(payload.title, SP_PARAM_TYPES.STRING);
    return await sp.toUniqueResult();
  }

  async exampleWithFilter(payload: ExampleFilter): Promise<ExampleResult[]> {
    const sp = this.execute('PR_SP_NAME', ExampleResult).addParam(payload.email, SP_PARAM_TYPES.STRING).addParam(payload.title, SP_PARAM_TYPES.STRING);
    return await sp.toListResult();
  }

  async exampleTransactionalSP1(payload: ExampleCmd, connection: Connection): Promise<number> {
    const sp = this.execute('PCK_ABMS_VIVIENDA.PR_BAJA_PROGRAMA', SpResult, connection).addParam(1561, SP_PARAM_TYPES.NUMBER);

    const spResult = await sp.toSpResult();
    return spResult.id;
  }

  async exampleTransactionalSP2(payload: ExampleCmd, connection: Connection): Promise<number> {
    const sp = this.execute('PCK_ABMS_VIVIENDA.PR_BAJA_PROGRAMA', SpResult, connection).addParam(1561, SP_PARAM_TYPES.NUMBER);

    const spResult = await sp.toSpResult();
    return spResult.id;
  }
}
