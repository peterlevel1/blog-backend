import {
  Controller,
  FileTypeValidator,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadConfig } from 'configs';
import { FileService } from '../file.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly fileService: FileService) {}

  @HttpCode(200)
  @Post('image')
  @UseInterceptors(FileInterceptor(uploadConfig.formField))
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: uploadConfig.image.article.maxSize }),
          new FileTypeValidator({ fileType: uploadConfig.image.article.fileType }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.uploadImage(file);
  }
}
