import { Contains, Length, IsEmail, IsInt, IsNotEmpty } from 'class-validator';
import { AbstractCmd } from './abstract.cmd';

export class IdCmd extends AbstractCmd {
  id: number;

  constructor() {
    super();
    this.id = undefined;
  }
}
