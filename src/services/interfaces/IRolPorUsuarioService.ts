import { RolPorUsuarioResult } from '../../models/results/rol_x_usuario.result';

export interface IRolPorUsuarioService {
  getAll(): Promise<RolPorUsuarioResult[]>;
}
