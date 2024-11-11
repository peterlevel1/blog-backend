const { writeFileSync, appendFileSync, readFileSync } = require('fs');
const chalk = require('chalk');
const { v4: uuidv4 } = require('uuid');
const { highlight } = require('cli-highlight');
const { DataSource } = require('typeorm');
const { format } = require('sql-formatter');
const { mysqlConfig, pathConfig } = require('../../dist/common/configs');
const { join } = require('path');

exports.command = 'orm <sub> [output]';

exports.desc = 'typeorm command utilities, ddl or schema';

exports.builder = {
  output: {
    describe: 'the file path for the output string',
    demandOption: false,
    type: 'string',
    default: join(pathConfig.project, 'scripts/sql/ddl.sql'),
  },
};

exports.handler = async (argv) => {
  let dataSource;
  let errCaught;
  let initialized = false;

  try {
    dataSource = new DataSource(mysqlConfig);

    Object.assign(dataSource.driver.mappedDataTypes, {
      createDatePrecision: null,
      updateDatePrecision: null,
      deleteDatePrecision: null,
    });

    if (argv.sub === 'source') {
      await dataSource.initialize();
      initialized = true;

      const file = join(pathConfig.project, 'scripts/sql/ddl.sql');
      const sql = readFileSync(file, 'utf-8');
      const runner = dataSource.createQueryRunner();

      await runner.query(sql);
    } else if (argv.sub === 'ddl' || argv.sub === 'schema') {
      dataSource.setOptions({
        synchronize: false,
        migrationsRun: false,
        dropSchema: false,
        logging: false,
      });

      if (argv.sub === 'ddl') {
        dataSource.setOptions({
          // TODO: 1. 不存在的库, 完全新的库，就会有 ddl
          // TODO: 2. 如果是现有的库，就会为了生成与现有代码一样的schema而所需修正的sql
          database: 'blog-' + uuidv4(),
        });
      }

      await dataSource.initialize();
      initialized = true;

      // console.trace('');
      const sqlInMemory = await dataSource.driver.createSchemaBuilder().log();
      // console.log(global.typeormMetadataArgsStorage);

      if (sqlInMemory.upQueries.length === 0) {
        console.log(
          chalk.yellow('Your schema is up to date - there are no queries to be executed by schema synchronization.'),
        );
      } else {
        const lengthSeparators = String(sqlInMemory.upQueries.length)
          .split('')
          .map((char) => '-')
          .join('');
        console.log(chalk.yellow('---------------------------------------------------------------' + lengthSeparators));
        console.log(
          chalk.yellow.bold(
            `-- Schema synchronization will execute following sql queries (${chalk.white(sqlInMemory.upQueries.length.toString())}):`,
          ),
        );
        console.log(chalk.yellow('---------------------------------------------------------------' + lengthSeparators));

        if (argv.output) {
          writeFileSync(argv.output, '', 'utf-8');
        }

        sqlInMemory.upQueries.forEach((upQuery, i) => {
          let sqlString = upQuery.query;
          sqlString = sqlString.trim();
          sqlString = sqlString.substr(-1) === ';' ? sqlString : sqlString + ';';

          if (argv.output) {
            let str = format(sqlString, {
              useTabs: false,
              tabWidth: 4,
              language: 'mysql',
              keywordCase: 'upper',
            });

            if (i === sqlInMemory.upQueries.length - 1) {
              str += '\n';
            } else {
              str += '\n\n';
            }
            appendFileSync(argv.output, str, 'utf-8');
          } else {
            console.log(highlight(sqlString));
          }
        });

        if (argv.output) {
          console.log(chalk.green('[orm] done for writting to the output file: ' + argv.output));
        }
      }
    } else {
      console.log(chalk.red.bold('[orm] no sub command found'));
    }
  } catch (err) {
    errCaught = err;
    console.error(chalk.red.bold('[orm] error: %s', errCaught));
  }

  if (initialized) {
    await dataSource.destroy();
  }

  process.exit(!errCaught ? 0 : 1);
};
