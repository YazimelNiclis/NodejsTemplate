import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';
import { IRolPorUsuarioService } from '../interfaces';
import { IRolesPorUsuarioRepository } from '../repositories';
import { RolPorUsuarioResult } from '../../models/results/rol_x_usuario.result';

@injectable()
export class RolPorUsuarioService implements IRolPorUsuarioService {
  private readonly _Repository: IRolesPorUsuarioRepository;

  constructor(@inject(TYPES.RolPorUsuarioRepository) respository: IRolesPorUsuarioRepository) {
    this._Repository = respository;
  }

  public getAll = async (): Promise<RolPorUsuarioResult[]> => {
    return this._Repository.getAll().then((result) => {
      return result;
    });
  };
}
