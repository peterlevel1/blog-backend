import { mysqlConfig } from './mysql.config';

export const knexConfig = {
  client: 'mysql2',
  connection: {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    timezone: mysqlConfig.timezone,
  },
};
