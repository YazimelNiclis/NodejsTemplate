import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';
import { IUsuariosRepository } from '../repositories/usuarios.repository';
import { UsuarioResult } from '../../models/results/usuario.result';
import { IUsuarioService } from '../interfaces/IUsuarioService';
import { UsuarioCmd } from '../../models/cmds/usuario.cmd';
import { Usuario } from '../../models/entities/usuario.entity';

@injectable()
export class UsuarioService implements IUsuarioService {
  private readonly _usuariosRepository: IUsuariosRepository;

  constructor(@inject(TYPES.UsuariosRepository) respository: IUsuariosRepository) {
    this._usuariosRepository = respository;
  }

  public async getUsuario(dni: number): Promise<UsuarioResult> {
    return this._usuariosRepository.getUsuario(dni).then((result) => {
      return result;
    });
  }

  public async getUsuarioById(id: number): Promise<UsuarioResult> {
    return this._usuariosRepository.getUsuarioById(id).then((result) => {
      return result;
    });
  }
  public async insertarUsuario(usuario: UsuarioCmd): Promise<UsuarioResult> {
    return this._usuariosRepository.insertarUsuario(usuario).then((result) => {
      return result;
    });
  }

  public async updateUsuario(usuario: UsuarioCmd): Promise<UsuarioResult> {
    return this._usuariosRepository.updateUsuario(usuario).then((result) => {
      return result;
    });
  }

  public async getUsuarios(): Promise<UsuarioResult[]> {
    return this._usuariosRepository.getUsers().then((result) => {
      return result;
    });
  }

  public async deleteUsuario(id: number): Promise<UsuarioResult> {
    return this._usuariosRepository.deleteUsuario(id).then((result) => {
      return result;
    });
  }

  public async insertQueryTransaction(users: UsuarioCmd[]): Promise<void> {
    return this._usuariosRepository.insertQueryTransaction(users).then((result) => {
      return result;
    });
  }
}
