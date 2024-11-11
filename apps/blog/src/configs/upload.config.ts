import { pathConfig } from './path.config';

export const uploadConfig = {
  // 300M
  diskMaxSize: 300 * 1024 * 1024,
  // diskMaxSize: 3 * 1024,
  // 磁盘上传路径
  uploadPath: pathConfig.storage.uploads.$path,
  // 上传的表单字段
  formField: 'file',
  //
  dayjsFormat: 'YYYY-MM-DDTHH-mm-ss-SSS',
  //
  pathPrefix: '/uploads',
  //
  image: {
    article: {
      // 5M
      maxSize: 5 * 1024 * 1024,
      //
      fileType: 'image/jpeg',
    },
  },
};
