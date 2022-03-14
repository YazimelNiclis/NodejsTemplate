// import { IRoute } from 'express';
import { Request, Response, Router } from 'express';
import { IRoute } from '../core/middlewares/route.interface';
import { UsuarioCmd } from '../models/cmds/usuario.cmd';
import { HTTP_METHODS } from '../models/enums/http-methods';
import { UsuarioFilter } from '../models/filters/usuario.filter';
import { UsuariosController } from '../controllers/usuarios.controller';
import { IdCmd } from '../models/cmds/id.cmd';

const userRoutes = Router();

export const controllerRoute = '/usuarios';

export const usuariosRoutes: IRoute[] = [
  {
    path: `/getAll`,
    method: HTTP_METHODS.GET,
    action: (req: Request, res: Response, payload: UsuarioFilter) => {
      return UsuariosController.getUsers(req, res);
    },
    filter: UsuarioFilter
  },
  {
    path: `/byId`,
    method: HTTP_METHODS.GET,
    action: (req: Request, res: Response, payload: UsuarioFilter) => {
      return UsuariosController.getUsuarioById(req, res, payload);
    },
    filter: UsuarioFilter
  },
  {
    path: `/insert`,
    method: HTTP_METHODS.POST,
    action: (req: Request, res: Response, payload: UsuarioCmd) => {
      return UsuariosController.insertarUsuario(req, res, payload);
    },
    cmd: UsuarioCmd
  },
  {
    path: `/update`,
    method: HTTP_METHODS.PATCH,
    action: (req: Request, res: Response, payload: UsuarioCmd) => {
      return UsuariosController.updateUsuario(req, res, payload);
    },
    cmd: UsuarioCmd
  },
  {
    path: `/delete`,
    method: HTTP_METHODS.DELETE,
    action: (req: Request, res: Response, payload: IdCmd) => {
      return UsuariosController.deleteUser(req, res, payload);
    },
    cmd: IdCmd
  },
  {
    path: `/insertMultiple`,
    method: HTTP_METHODS.POST,
    action: (req: Request, res: Response, payload: UsuarioCmd[]) => {
      return UsuariosController.insertQueryTransaction(req, res, payload);
    },
    cmd: UsuarioCmd
  }
];

export default userRoutes;
