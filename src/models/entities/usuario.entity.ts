import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { RolesPorUsuario } from './rol_x_usuario.entity';

@Entity('USUARIOS')
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;
  @Column('varchar', { name: 'Nombre', nullable: true, length: '255' })
  nombre: string;
  @Column('varchar', { name: 'Apellido', nullable: true, length: '255' })
  apellido: string;
  @Column({ type: 'int', name: 'Dni', nullable: false })
  dni: number;
  @Column('varchar', { name: 'Email', nullable: false, length: '255' })
  email: string;
  @Column('varchar', { name: 'Password', nullable: false, length: '255' })
  password: string;
  @Column({ type: 'datetime', name: 'FEC_ALTA', nullable: true })
  fechaAlta: Date;
  @Column({ type: 'datetime', name: 'FEC_BAJA', nullable: true })
  fechaBaja: Date;
  @Column({ type: 'datetime', name: 'FEC_MODIFICACION', nullable: true })
  fechaModificacion: Date;

  @OneToMany(() => RolesPorUsuario, (rolPorUsuario) => rolPorUsuario.user)
  @JoinColumn({ name: 'ID_USUARIO', referencedColumnName: 'idUsuario' })
  rolesPorUsuario: RolesPorUsuario[];
}
