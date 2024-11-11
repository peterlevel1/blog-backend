import { mysqlConfig } from 'configs';
import { MysqlModule } from '@common/modules/mysql';
import { knexConfig } from 'configs';
import { KnexModule } from '@common/modules/knex';

export const MysqlDbModule = MysqlModule.forRoot(mysqlConfig);

export const KnexDbModule = KnexModule.forRoot({
  config: knexConfig,
});
