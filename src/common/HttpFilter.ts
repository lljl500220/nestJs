import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';

export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    // console.log(exception);
    const res = ctx.getResponse();
    const status = exception.getStatus();
    res.status(status).json({
      success: false,
      time: new Date(),
      data: exception.getResponse(),
      status,
    });
  }
}
