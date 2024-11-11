import { Controller, HttpCode, Get, Param } from '@nestjs/common';

@Controller('download')
export class DownloadController {
  @HttpCode(200)
  @Get('image')
  async downloadImage(@Param('url') url: string) {}
}
