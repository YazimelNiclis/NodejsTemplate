import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { RolesPorUsuario } from './rol_x_usuario.entity';
import { Usuario } from './usuario.entity';

@Entity('ROLES')
export class Roles {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID_ROL' })
  id: number;

  @Column({ type: 'varchar', name: 'TX_ROL' })
  nombre: string;

  @Column({ type: 'int', name: 'NU_VALUE' })
  keyValue: number;

  @OneToOne(() => RolesPorUsuario, (rol) => rol.rol)
  rolPorUsuario: RolesPorUsuario;
}
