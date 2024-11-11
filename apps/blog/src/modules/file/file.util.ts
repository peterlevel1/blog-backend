import * as dayjs from 'dayjs';
import { appConfig, uploadConfig } from 'configs';
import { join } from 'path';

export const uploadUtil = {
  genFilename(file: Express.Multer.File) {
    return `${dayjs().format(uploadConfig.dayjsFormat)}--${file.originalname}`;
  },

  getDiskUploadPath(filename: string) {
    return join(uploadConfig.uploadPath, filename);
  },
};
