import { Expose } from 'class-transformer';
import { RolPorUsuarioResult } from './rol_x_usuario.result';

export class UsuarioResult {
  @Expose({ name: 'id' })
  id: number;
  @Expose({ name: 'nombre' })
  nombre: string;
  @Expose({ name: 'apellido' })
  apellido: string;
  @Expose({ name: 'dni' })
  dni: number;
  @Expose({ name: 'email' })
  email: string;
  @Expose({ name: 'password' })
  password: string;
  @Expose({ name: 'fechaAlta' })
  fechaAlta: Date;
  @Expose({ name: 'fechaBaja' })
  fechaBaja: Date;
  @Expose({ name: 'fechaModificacion' })
  fechaModificacion: Date;
  @Expose({ name: 'rolesPorUsuario' })
  rolesPorUsuario?: RolPorUsuarioResult[];

  constructor() {
    this.id = undefined;
    this.nombre = undefined;
    this.apellido = undefined;
    this.dni = undefined;
    this.email = undefined;
    this.password = undefined;
    this.rolesPorUsuario = undefined;
    this.fechaAlta = undefined;
    this.fechaBaja = undefined;
    this.fechaModificacion = undefined;
  }
}
