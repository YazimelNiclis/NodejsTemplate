import { IsNumberString } from 'class-validator';
import { AbstractFilter } from './abstract.filter';
import { IsMinString } from '../../core/middlewares/payload/custom-validators/min-as-string';

export class IdFilter extends AbstractFilter {
  // @IsNumberString()
  @IsNumberString()
  @IsMinString(0)
  id: number;

  constructor() {
    super();
  }
}
