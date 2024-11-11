import { MysqlModuleOptions } from '@common/modules/mysql';

export const mysqlConfig: MysqlModuleOptions = {
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  pool: true,
  namedPlaceholders: true,
  timezone: '+08:00',
};

export default mysqlConfig;
