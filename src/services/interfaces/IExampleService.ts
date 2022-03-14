import { ExampleCmd } from '../../models/cmds/example.cmd';
import { ExampleFilter } from '../../models/filters/example.filter';
import { ExampleResult } from '../../models/results/example.result';

export interface IExampleService {
  exampleWithCmd(payload: ExampleCmd): Promise<ExampleResult>;
  exampleWithFilter(payload: ExampleFilter): Promise<ExampleResult[]>;
  exampleOfTransaction(payload: ExampleCmd): Promise<number>;
}
