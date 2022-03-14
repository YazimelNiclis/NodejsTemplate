/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Connection, createConnection } from 'typeorm';
export const connectDB = async () => {
  return await createConnection();
};

export const consoleDatabaseInfo = (connection: Connection) => {
  console.log('Database params: ');
  // @ts-ignore
  console.log('server:' + connection.options.host);
  // @ts-ignore
  console.log('port:' + connection.options.port);
  // @ts-ignore
  console.log('username:' + connection.options.username);
  // @ts-ignore
  //console.log('password: ' + connection.options.password.replace(/./g, '*'));
};
