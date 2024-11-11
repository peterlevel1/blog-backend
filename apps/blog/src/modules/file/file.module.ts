import { Module } from '@nestjs/common';
import { UploadController } from './controllers/upload.controller';
import { FileService } from './file.service';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [FileService],
})
export class FileModule {}
