import { IRouter, Router } from 'express';
import { AbstractCmd } from '../../models/cmds/abstract.cmd';

export interface IRoute {
  path: string;
  method: string;
  action: Function;
  cmd?: typeof AbstractCmd;
  filter?: any;
  routerAction?: IRouter | Function;
}
