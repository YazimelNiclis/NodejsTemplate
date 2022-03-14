import { Type } from 'class-transformer';
import { Contains, Length, IsEmail, IsNumberString, IsOptional, IsNumber, Min, Max, isInt, IsInt } from 'class-validator';
import { AbstractFilter } from './abstract.filter';
import { IsMinString } from '../../core/middlewares/payload/custom-validators/min-as-string';

/**
 * Ejemplo de Cmd
 */

export class ExampleFilter extends AbstractFilter {
  @Length(10, 20)
  @IsOptional()
  title: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumberString()
  @IsMinString(5)
  numberAsString: number;

  constructor() {
    super();
    this.title = undefined;
    this.email = undefined;
    this.numberAsString = undefined;
  }
}
