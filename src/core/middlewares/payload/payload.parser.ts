import { Request } from 'express';
import { AbstractCmd } from '../../../models/cmds/abstract.cmd';
import { HTTP_METHODS } from '../../../models/enums/http-methods';
import { AbstractFilter } from '../../../models/filters/abstract.filter';
import { IRoute } from '../route.interface';

export class PayloadParser {
  private readonly request: Request;
  private readonly route: IRoute;

  constructor(request: Request, route: IRoute) {
    this.request = request;
    this.route = route;
  }

  public getObjectPayload(): AbstractFilter | AbstractCmd {
    switch (this.request.method) {
      case HTTP_METHODS.POST: {
        if (this.route.cmd) {
          const cmd = new this.route.cmd();
          const data = this.request.body;
          Object.assign(cmd, data);
          return cmd;
        }
        break;
      }
      case HTTP_METHODS.PATCH: {
        if (!!this.route.cmd) {
          const cmd = new this.route.cmd();
          const data = this.request.body;
          Object.assign(cmd, data);
          return cmd;
        }
        break;
      }
      case HTTP_METHODS.GET: {
        if (this.route.filter) {
          const filter = new this.route.filter();
          const queryData = this.request.query;
          Object.assign(filter, queryData);
          return filter;
        }
        break;
      }
      case HTTP_METHODS.DELETE: {
        if (!!this.route.cmd) {
          const cmd = new this.route.cmd();
          const data = this.request.body;
          Object.assign(cmd, data);
          return cmd;
        }
        break;
      }
    }
  }

  private getDataParsed(value: string, dataType: any): any {
    switch (dataType) {
      case 'string':
        break;
      case 'number':
        return +value;
      case 'boolean':
        return value == 'true';
      case 'symbol':
        break;
      case 'undefined':
        break;
      case 'object':
        break;
      case 'function':
        break;
      default:
        return;
    }
  }
}
