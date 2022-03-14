import { UsuarioCmd } from '../../models/cmds/usuario.cmd';
import { Usuario } from '../../models/entities/usuario.entity';
import { UsuarioResult } from '../../models/results/usuario.result';

export interface IUsuarioService {
  getUsuario(dni: number): Promise<UsuarioResult>;
  getUsuarioById(id: number): Promise<UsuarioResult>;
  insertarUsuario(usuario: UsuarioCmd): Promise<UsuarioResult>;
  updateUsuario(usuario: UsuarioCmd): Promise<UsuarioResult>;
  getUsuarios(): Promise<UsuarioResult[]>;
  deleteUsuario(id: number): Promise<UsuarioResult>;
  insertQueryTransaction(users: UsuarioCmd[]): Promise<void>;
}
