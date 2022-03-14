import { Expose } from 'class-transformer';

export class RolPorUsuarioResult {
  @Expose({ name: 'id' })
  id: number;
  @Expose({ name: 'idRol' })
  idRol: number;
  @Expose({ name: 'idUsuario' })
  idUsuario: number;
  @Expose({ name: 'fechaAlta' })
  fechaAlta: Date;
  @Expose({ name: 'fechaBaja' })
  fechaBaja: Date;

  constructor() {
    this.id = undefined;
    this.idRol = undefined;
    this.idUsuario = undefined;
    this.fechaAlta = undefined;
    this.fechaBaja = undefined;
  }
}
