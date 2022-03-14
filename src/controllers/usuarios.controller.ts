import { Request, Response } from 'express';
import { HTTP_CODES } from '../models/enums/http-codes';
import container from '../services/inversify.config';
import { TYPES } from '../services/types/types';
import { IUsuarioService } from '../services/interfaces/IUsuarioService';
import { UsuarioFilter } from '../models/filters/usuario.filter';
import { UsuarioResult } from '../models/results/usuario.result';
import { UsuarioCmd } from '../models/cmds/usuario.cmd';
import { IdCmd } from '../models/cmds/id.cmd';

const _typeUser: UsuarioResult = new UsuarioResult();
const _typeUsers: UsuarioResult[] = [];
let _typePromise: Promise<void>;

const _usuarioService = container.get<IUsuarioService>(TYPES.UsuariosService);

const serviceCall = async (action: Promise<any>, resultType: Object, req: Request, res: Response) => {
  return action
    .then((data: typeof resultType) => {
      return res.status(HTTP_CODES.OK).json(data);
    })
    .catch((err) => {
      res.status(HTTP_CODES.INTERNAL_ERROR).json(`${err}`);
    });
};

export const UsuariosController = {
  getUsuario: async (req: Request, res: Response, payload: UsuarioFilter) => serviceCall(_usuarioService.getUsuario(payload.dni), typeof _typeUser, req, res),
  getUsuarioById: async (req: Request, res: Response, payload: UsuarioFilter) => serviceCall(_usuarioService.getUsuarioById(payload.id), typeof _typeUser, req, res),
  insertarUsuario: (req: Request, res: Response, payload: UsuarioCmd) => serviceCall(_usuarioService.insertarUsuario(payload), typeof _typeUser, req, res),
  updateUsuario: async (req: Request, res: Response, payload: UsuarioCmd) => serviceCall(_usuarioService.updateUsuario(payload), typeof _typeUser, req, res),
  getUsers: async (req: Request, res: Response) => serviceCall(_usuarioService.getUsuarios(), typeof _typeUsers, req, res),
  deleteUser: async (req: Request, res: Response, payload: IdCmd) => serviceCall(_usuarioService.deleteUsuario(payload.id), typeof _typeUser, req, res),
  insertQueryTransaction: async (req: Request, res: Response, payload: UsuarioCmd[]) => serviceCall(_usuarioService.insertQueryTransaction(payload), typeof _typePromise, req, res)
};
