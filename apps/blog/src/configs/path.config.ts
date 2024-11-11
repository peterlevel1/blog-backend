import { join } from 'node:path';

export const PATH_PROJECT = join(__dirname, '../..');
export const PATH_CODES = join(__dirname, '..');
export const PATH_STORAGE = process.env.STORAGE_PATH;

export const pathConfig = {
  project: PATH_PROJECT,
  codes: PATH_CODES,
  src: join(PATH_PROJECT, 'src'),
  dist: join(PATH_PROJECT, 'dist'),
  storage: {
    logs: {
      morgan: {
        $path: join(PATH_STORAGE, 'logs/morgan'),
      },
      log4js: {
        applicationLog: join(PATH_STORAGE, 'logs/log4js/application.log'),
      },
    },
    uploads: {
      $path: join(PATH_STORAGE, 'uploads'),
    },
  },
};
