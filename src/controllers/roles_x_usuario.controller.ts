import { Request, Response } from 'express';
import { HTTP_CODES } from '../models/enums/http-codes';
import container from '../services/inversify.config';
import { TYPES } from '../services/types/types';
import { IRolPorUsuarioService } from '../services/interfaces';
import { RolPorUsuarioResult } from '../models/results/rol_x_usuario.result';

const _rolPorUsuarioService = container.get<IRolPorUsuarioService>(TYPES.RolPorUsuarioService);

const getAll = async (req: Request, res: Response) => {
  return _rolPorUsuarioService.getAll().then((data: RolPorUsuarioResult[]) => {
    return res.status(HTTP_CODES.OK).json(data);
  });
};

export const RolPorUsuarioController = {
  getAll
};
