import { Container } from 'inversify';
import { TYPES } from './types/types';
import { ExampleRepository, IExampleRepository, IRolesPorUsuarioRepository, RolPorUsuarioRepository } from './repositories';
import { IExampleService, IRolPorUsuarioService, IUsuarioService } from './interfaces';
import { ExampleService, UsuarioService } from './implementations';
import { IUsuariosRepository, UsuariosRepository } from './repositories/usuarios.repository';
import { RolPorUsuarioService } from './implementations/rol_x_usuario.service';

/**
 * Clase encargada de hacer el registro de todas las interfaces, con sus respectivos tipos e implementaciones
 * para que queden disponibles en el contenedor de injección de dependencias.
 */

const container = new Container();

container.bind<IExampleService>(TYPES.ExampleService).to(ExampleService);
container.bind<IExampleRepository>(TYPES.ExampleRepository).to(ExampleRepository);

container.bind<IUsuarioService>(TYPES.UsuariosService).to(UsuarioService);
container.bind<IUsuariosRepository>(TYPES.UsuariosRepository).to(UsuariosRepository);

container.bind<IRolPorUsuarioService>(TYPES.RolPorUsuarioService).to(RolPorUsuarioService);
container.bind<IRolesPorUsuarioRepository>(TYPES.RolPorUsuarioRepository).to(RolPorUsuarioRepository);

export default container;
