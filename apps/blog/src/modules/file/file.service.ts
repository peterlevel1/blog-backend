import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ImageEntity } from '@databases/mysql';
import { writeFile } from 'fs/promises';
import { uploadUtil } from './file.util';
import { ImageRepository } from '@databases/mysql/repositories/image.repository';

@Injectable()
export class FileService {
  constructor(private readonly imageRepo: ImageRepository) {}

  async uploadImage(file: Express.Multer.File) {
    const filename = uploadUtil.genFilename(file);

    try {
      await writeFile(uploadUtil.getDiskUploadPath(filename), file.buffer);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }

    const imageEntity = new ImageEntity({
      path: filename,
      size: file.size,
      name: file.originalname,
      type: file.mimetype,
    });

    return await this.imageRepo.create(imageEntity);
  }

  async downloadImage() {}
}
