import { join } from 'path';
import { readdir, stat } from 'fs/promises';
import { Request, Response, NextFunction } from 'express';
import { BadRequestException, Injectable, NestMiddleware, RequestMapping, RequestMethod } from '@nestjs/common';
import { uploadConfig } from 'configs';
import { messages } from '../messages';

@Injectable()
class UploadDirectoryLimitMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const filenames = await readdir(uploadConfig.uploadPath);

    let totalSize = 0;

    for (const filename of filenames) {
      const filePath = join(uploadConfig.uploadPath, filename);
      const fileStat = await stat(filePath);

      totalSize += fileStat.size;
    }

    if (totalSize > uploadConfig.diskMaxSize) {
      throw new BadRequestException(messages.exception.upload.UPLOAD_DIRECTORY_SIZE_LIMIT_EXCEEDED);
    }

    next();
  }
}

export default {
  middleware: UploadDirectoryLimitMiddleware,
  routes: [
    {
      path: '/upload/image',
      method: RequestMethod.POST,
    },
  ],
};
