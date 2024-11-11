import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { IResponse } from '../interfaces';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const { method, url } = request;

    this.logger.error(
      `${method} ${url} - ${status} - ${exception.message}`,
      exception.stack ? '\n    ' + exception.stack : '',
    );

    const data: IResponse = {
      code: status,
      // status,
      // method,
      // url,
      // timestamp: timeUtil.timestamp(),
      // 一些生产环境倾向于禁用详细的错误
      // message: null,
    };

    if (process.env.NODE_ENV !== 'production') {
      data.message = exception.message;
    }

    response.status(status).json(data);
  }
}
