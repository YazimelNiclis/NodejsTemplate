import { IsNumberString, IsOptional } from 'class-validator';
import { AbstractFilter } from './abstract.filter';
import { IsMinString } from '../../core/middlewares/payload/custom-validators/min-as-string';

export class UsuarioFilter extends AbstractFilter {
  // @IsNumberString()
  id: number;
  @IsNumberString()
  @IsMinString(0)
  @IsOptional()
  dni: number;

  constructor() {
    super();
    this.dni = undefined;
    this.id = undefined;
  }
}
