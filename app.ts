import 'reflect-metadata';
import 'dotenv/config';
import { request, Request, response, Response, json } from 'express';
import express from 'express';
//import { AppRoutes } from './src/routes/routes';
import { connectDB, consoleDatabaseInfo } from './src/database/database';
import { launchReconnectJob } from 'oracle-reconnect';
import cookieParser from 'cookie-parser';
import { configCidi } from './cidi';
import { payloadValidation } from './src/core/middlewares/payload/payload.middleware';
import { HTTP_METHODS } from './src/models/enums/http-methods';
import { handlerError } from './src/core/middlewares/error-handler.middleware';
import { corsMiddleware } from './src/core/middlewares/cors-middleware';
import { logger } from './src/core/logger/CustomLogger';
import { IRoute } from './src/routes/index.routes';
import router from './src/routes/index.routes';

export const app = express();

app.use(corsMiddleware());
app.use(cookieParser());
app.use(json({ limit: '30mb' }));
app.use(handlerError);

launchReconnectJob('1 * * * * *');

app.use('/', router);

const startServer = async () => {
  const port = process.env.PORT || 8080;
  await app.listen(port, () => {
    logger.info(`Server running on http://127.0.0.1:${port}`);
  });
};

(async () => {
  let connection = await connectDB();
  consoleDatabaseInfo(connection);
  await startServer();
  await configCidi();
})();
