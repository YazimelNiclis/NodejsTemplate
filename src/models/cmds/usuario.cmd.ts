import { Contains, Length, IsEmail, IsInt, IsNotEmpty } from 'class-validator';
import { AbstractCmd } from './abstract.cmd';

export class UsuarioCmdList extends AbstractCmd {
  list: UsuarioCmd[];
  constructor() {
    super();
    this.list = [];
  }
}

export class UsuarioCmd extends AbstractCmd {
  id: number;

  @Length(1, 255)
  @IsNotEmpty()
  nombre: string;

  @Length(1, 255)
  @IsNotEmpty()
  apellido: string;

  @IsInt()
  @IsNotEmpty()
  dni: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  constructor() {
    super();
    // this.id = undefined;
    // this.nombre = undefined;
    // this.apellido = undefined;
    // this.dni = undefined;
    // this.email = undefined;
    // this.password = undefined;
  }
}
