import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';

export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const status = exception.getStatus();
    res.status(status).json({
      success: false,
      time: new Date(),
      data: exception.message,
      status,
    });
  }
}
