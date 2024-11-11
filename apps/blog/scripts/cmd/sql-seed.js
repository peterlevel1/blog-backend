const { join } = require('path');
const { readFile } = require('fs/promises');
const { DataSource } = require('typeorm');
const { mysqlConfig, pathConfig } = require('../../dist/common/configs');

exports.command = 'sql-seed';

exports.desc = 'seed data into mysql database';

exports.handler = async () => {
  try {
    const mysqlDataSource = new DataSource(mysqlConfig);
    await mysqlDataSource.initialize();

    const queryRunner = mysqlDataSource.createQueryRunner();
    await queryRunner.connect();

    const pathSqlSeed = join(pathConfig.project, 'scripts/sql/seed.sql');
    const seedSqlText = await readFile(pathSqlSeed, 'utf-8');
    const resultSeed = await queryRunner.query(seedSqlText);

    console.log('[sql-seed] resultSeed: %o', resultSeed);
    await mysqlDataSource.destroy();
  } catch (err) {
    console.error('[sql-seed] error: %s', err);
    process.exit(1);
  }
};
