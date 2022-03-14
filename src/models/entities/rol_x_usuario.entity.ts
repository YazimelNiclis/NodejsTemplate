import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Roles } from './rol.entity';
import { Usuario } from './usuario.entity';

@Entity('ROLES_X_USUARIO')
export class RolesPorUsuario {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID_ROL_X_USUARIO' })
  id: number;

  @Column({ type: 'int', name: 'ID_ROL', nullable: false })
  idRol: number;

  @Column({ type: 'int', name: 'ID_USUARIO', nullable: false })
  idUsuario: number;

  @Column({ type: 'datetime', name: 'FEC_ALTA', nullable: true })
  fechaAlta: Date;

  @Column({ type: 'datetime', name: 'FEC_BAJA', nullable: true })
  fechaBaja: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.rolesPorUsuario)
  @JoinColumn({ name: 'ID_USUARIO', referencedColumnName: 'id' })
  user: Usuario;

  @OneToOne(() => Roles, (rol) => rol.rolPorUsuario)
  @JoinColumn({ name: 'ID_ROL', referencedColumnName: 'id' })
  rol: Roles;
  //@JoinColumn([{ name: 'ID_PERSONA', referencedColumnName: 'idPersona' }])
}
