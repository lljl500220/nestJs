import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';

interface Data<T> {
  data: T;
}
@Injectable()
export class ResponseCaptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Data<T>> | Promise<Observable<Data<T>>> {
    const res = context.switchToHttp().getResponse<Response>();
    const req = context.switchToHttp().getRequest<Request>();
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: 0,
          message: '',
          success: '',
        };
      }),
    );
  }
}
