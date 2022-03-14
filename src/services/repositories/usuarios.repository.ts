import { plainToClass } from 'class-transformer';
import { injectable } from 'inversify';
import { AbstractRepository } from '../../core/repository/abstract.repository';
import { UsuarioResult } from '../../models/results/usuario.result';
import { getManager, Repository, getRepository, IsNull, EntitySchema, EntityManager, getConnection } from 'typeorm';
import { Usuario } from '../../models/entities/usuario.entity';
import { UsuarioCmd } from '../../models/cmds/usuario.cmd';

export interface IUsuariosRepository {
  getUsuario(dni: number): Promise<UsuarioResult>;
  getUsuarioById(id: number): Promise<UsuarioResult>;
  insertarUsuario(usuario: UsuarioCmd): Promise<UsuarioResult>;
  updateUsuario(usuario: UsuarioCmd): Promise<UsuarioResult>;
  getUsers(): Promise<UsuarioResult[]>;
  deleteUsuario(id: number): Promise<UsuarioResult>;
  insertQueryTransaction(users: UsuarioCmd[]): Promise<void>;
}

@injectable()
export class UsuariosRepository extends AbstractRepository implements IUsuariosRepository {
  async getUsuario(dni: number): Promise<UsuarioResult> {
    return await getManager()
      .query('CALL GetUsersByFilters(?)', [dni])
      .then((res) => {
        console.log(res);
        const result = plainToClass(UsuarioResult, [...res[0]]);
        return result[0];
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getUsuarioById = async (id: number): Promise<UsuarioResult> => {
    if (id === undefined) throw new Error('Ingrese correctamente el id');
    const userRepository: Repository<Usuario> = getRepository(Usuario);
    return await userRepository
      .find({
        where: { id: id },
        relations: ['rolesPorUsuario']
        //loadRelationIds: true
        //join: { alias: 'usuario', leftJoinAndSelect: { roles_x_usuario: 'usuario.rolesPorUsuario' } }
      })
      .then((res: Usuario[]) => {
        console.log(res);
        return res.pop();
      })
      .catch((err) => {
        throw new Error(err);
      });
    /*
  return await getManager()
    .find(Usuario, { id })
    .then((res: Usuario[]) => {
      const result = plainToClass(UsuarioResult, [res[0]]);
      return result.pop();
    })
    .catch((err) => {
      throw new Error(err);
    });
    */
  };

  insertarUsuario = async (usuario: UsuarioCmd): Promise<UsuarioResult> => {
    const userRepository: Repository<Usuario> = getRepository(Usuario);
    let user = new Usuario();
    user = { ...usuario, rolesPorUsuario: [], fechaAlta: new Date(), fechaBaja: null, fechaModificacion: null };
    return await userRepository
      .insert(user)
      .then((res: any) => {
        console.log('1', res);
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  updateUsuario = async (usuarioCmd: UsuarioCmd | any): Promise<UsuarioResult> => {
    const userRepository: Repository<Usuario> = getRepository(Usuario);
    return await userRepository
      .findOneOrFail(usuarioCmd.id)
      .then(async (user: Usuario) => {
        // Elimino los atributos de CMD que sean undefined
        // esta accion deberia estar en otro lado?
        const atributosObjeto: string[] = Object.keys(usuarioCmd);
        atributosObjeto.forEach((atributo: string) => {
          if (usuarioCmd[atributo] === undefined) {
            delete usuarioCmd[atributo];
          }
        });

        user = { ...user, ...usuarioCmd, fechaModificacion: new Date() };

        await userRepository
          .update(user.id, user)
          .then((ok) => {
            if (!ok) {
              throw new Error();
            }
          })
          .catch((err) => {
            throw new Error(err);
          });

        return user;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  getUsers = async (): Promise<UsuarioResult[]> => {
    const userRepository: Repository<Usuario> = getRepository(Usuario);
    return await userRepository
      .find({ where: { fechaBaja: IsNull() } })
      .then((res: UsuarioResult[]) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  deleteUsuario = async (id: number): Promise<UsuarioResult> => {
    const userRepository: Repository<Usuario> = getRepository(Usuario);
    return await userRepository
      .findOneOrFail(id)
      .then(async (user: Usuario) => {
        user.fechaBaja = new Date();
        await userRepository
          .update(user.id, user)
          .then((ok) => {
            if (!ok) {
              throw new Error();
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
        return user;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  insertQueryTransaction = async (users: UsuarioCmd[]): Promise<void> => {
    const userRepository: Repository<Usuario> = getRepository(Usuario);
    return await getManager()
      .transaction(async (transactionalEntityManager: EntityManager) => {
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          let usuario = new Usuario();
          usuario = { ...user, rolesPorUsuario: [], fechaAlta: new Date(), fechaBaja: null, fechaModificacion: null };
          await transactionalEntityManager.insert(Usuario, usuario).catch((error) => {
            throw new Error(error);
          });
        }
      })
      .then((res) => {
        console.log('Transaccion realizada con éxito');
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
}
