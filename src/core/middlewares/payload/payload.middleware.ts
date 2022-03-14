import { Request } from 'express';
import { IRoute } from '../route.interface';
import { PayloadParser } from './payload.parser';

export async function payloadValidation(request: Request, route: IRoute): Promise<any> {
  const payloadParser = new PayloadParser(request, route);
  const payload = payloadParser.getObjectPayload();
  await payload.validate();
}
