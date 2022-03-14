import { IRoute } from '../core/middlewares/route.interface';
import { ExampleCmd } from '../models/cmds/example.cmd';
import { HTTP_METHODS } from '../models/enums/http-methods';
import { ExampleFilter } from '../models/filters/example.filter';
import { ExamplesController } from '../controllers/example.controller';

/**
 * Rutas del microservicio.
 */
const controllerRoute = '/examples';

export const ExampleRoutes: IRoute[] = [
  {
    path: `${controllerRoute}/peticion-con-cmd`,
    method: HTTP_METHODS.POST,
    action: ExamplesController.exampleWithCmd,
    cmd: ExampleCmd
  },
  {
    path: `${controllerRoute}/peticion-con-filtros`,
    method: HTTP_METHODS.GET,
    action: ExamplesController.exampleWithFilters,
    filter: ExampleFilter
  },
  {
    path: `${controllerRoute}/transaccion`,
    method: HTTP_METHODS.POST,
    action: ExamplesController.exampleOfTransaction,
    cmd: ExampleCmd
  }
];
