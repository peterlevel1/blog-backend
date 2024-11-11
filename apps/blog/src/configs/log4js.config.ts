import { pathConfig } from './path.config';

const LOG4JS_DEFAULT_LAYOUT = {
  type: 'pattern',
  // log4js default pattern %d{yyyy-MM-dd HH:mm:ss:SSS} [%thread] %-5level %logger{36} - %msg%n
  // we use process id instead thread id
  pattern: '%[%d{yyyy-MM-dd hh:mm:ss:SSS} %p --- [%15.15x{name}]%] %40.40f{3}  : %m',
  tokens: {
    name: (logEvent) => {
      return (logEvent.context && logEvent.context['name']) || '-';
    },
  },
};

const LOG4JS_NO_COLOUR_DEFAULT_LAYOUT = {
  type: 'pattern',
  // log4js default pattern %d{yyyy-MM-dd HH:mm:ss:SSS} [%thread] %-5level %logger{36} - %msg%n
  // we use process id instead thread id
  // ==========================================================================================
  // pattern: '%d{yyyy-MM-dd hh:mm:ss:SSS} %p --- [%15.15x{name}] %40.40f{3}  : %m',
  pattern: '%d{yyyy-MM-dd hh:mm:ss:SSS} %p --- [%x{name}] : %m',
  // ==========================================================================================
  // pattern: '%d{yyyy-MM-dd hh:mm:ss:SSS} %p --- %m',
  tokens: {
    name: (logEvent) => {
      return (logEvent.context && logEvent.context['name']) || '-';
    },
  },
};

export const log4jsConfig = {
  config: {
    appenders: {
      stdout: {
        type: 'stdout',
        layout: LOG4JS_DEFAULT_LAYOUT,
      },
      // file: {
      //   type: 'file',
      //   filename: pathConfig.storage.logs.log4js.applicationLog,
      //   maxLogSize: 20 * 1024 * 1024, // maxLogSize use bytes ad unit
      //   backups: 10, // default use 5 so 1KB file size total rotating
      //   layout: LOG4JS_NO_COLOUR_DEFAULT_LAYOUT,
      // },
      file: {
        type: 'dateFile',
        filename: pathConfig.storage.logs.log4js.applicationLog,
        keepFileExt: true,
        compress: false,
        layout: LOG4JS_NO_COLOUR_DEFAULT_LAYOUT,
      },
    },
    categories: {
      default: {
        enableCallStack: true,
        appenders: ['stdout', 'file'],
        level: 'debug',
      },
    },
  },
};
