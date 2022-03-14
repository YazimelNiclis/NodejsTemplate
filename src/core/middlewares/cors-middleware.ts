import cors = require('cors');

export const corsMiddleware = function () {
  return cors({
    credentials: true,
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    exposedHeaders: ['Authorization']
  });
};
