import { injectable } from 'inversify';
import { AbstractRepository } from '../../core/repository/abstract.repository';
import { Repository, getRepository } from 'typeorm';
import { RolesPorUsuario } from '../../models/entities/rol_x_usuario.entity';

export interface IRolesPorUsuarioRepository {
  getAll(): Promise<RolesPorUsuario[]>;
}

@injectable()
export class RolPorUsuarioRepository extends AbstractRepository implements IRolesPorUsuarioRepository {
  getAll = async (): Promise<RolesPorUsuario[]> => {
    const rolesPorUsuarioRepository: Repository<RolesPorUsuario> = getRepository(RolesPorUsuario);
    return await rolesPorUsuarioRepository
      .find({ relations: ['rol'] })
      .then((res: RolesPorUsuario[]) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
}
