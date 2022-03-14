import { Request, Response, Router } from 'express';
import { payloadValidation } from '../core/middlewares/payload/payload.middleware';
import { HTTP_METHODS } from '../models/enums/http-methods';
import userRoutes, { controllerRoute, usuariosRoutes } from './usuarios.routes';

const router = Router();

const startRoutes = new Promise<void>((resolve, reject) => {
  for (let i = 0; i < usuariosRoutes.length; i++) {
    let route = usuariosRoutes[i];
    router.use(`/usuarios${route.path}`, async (request: Request, response: Response, next: Function) => {
      if (request.method !== route.method) {
        response.status(405);
        response.send('405 | Method Not Allowed');
        return;
      }

      await payloadValidation(request, route);
      switch (request.method) {
        case HTTP_METHODS.GET: {
          return route.action(request, response, <any>request.query);
        }
        case HTTP_METHODS.POST: {
          return route.action(request, response, <any>request.body);
        }
        case HTTP_METHODS.PATCH: {
          return route.action(request, response, <any>request.body);
        }
        case HTTP_METHODS.DELETE: {
          return route.action(request, response, <any>request.body);
        }
        default: {
          next();
        }
      }
    });
  }
  router.use('*', (req, res) => {
    res.status(404);
    res.send('404 | Not Found');
  });
  resolve();
});

startRoutes;

export default router;
export * from '../core/middlewares/route.interface';
export * from './example.routes';
export * from './usuarios.routes';
export * from './roles.routes';
