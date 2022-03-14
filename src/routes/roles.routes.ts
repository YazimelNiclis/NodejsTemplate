import { IRoute } from '../core/middlewares/route.interface';
import { HTTP_METHODS } from '../models/enums/http-methods';
import { AbstractFilter } from '../models/filters/abstract.filter';
import { RolPorUsuarioController } from '../controllers/roles_x_usuario.controller';

/**
 * Rutas del microservicio.
 */
const controllerRoute = '/roles';

export const RolesRoutes: IRoute[] = [
  {
    path: `${controllerRoute}/rolesPorUsuario`,
    method: HTTP_METHODS.GET,
    action: RolPorUsuarioController.getAll,
    filter: AbstractFilter
  }
];
