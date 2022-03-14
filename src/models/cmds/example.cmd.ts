import { Contains, Length, IsEmail } from 'class-validator';
import { AbstractCmd } from './abstract.cmd';

/**
 * Ejemplo de Cmd. Todo Cmd debé heredar de AbstractCmd obligatoriamente.
 */

export class ExampleCmd extends AbstractCmd {
  @Length(10, 20)
  title: string;

  @IsEmail()
  email: string;

  constructor() {
    super();
    this.title = undefined;
    this.email = undefined;
  }
}
