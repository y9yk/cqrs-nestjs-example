import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // dispatch http-exception
    if (exception instanceof HttpException) {
      const error = exception.getResponse() as {
        statusCode: number;
        message: string | string[];
        error: string;
      };
      // if error.statusCode is exist return it (other case return 500)
      const statusCode = error.statusCode
        ? error.statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR;
      response.status(statusCode).json({
        ...error,
      });
    } else {
      // raise internal_server_error when other error has occured.
      const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      response.status(statusCode).json({
        statusCode,
        message: 'Internal Server Error',
        error: exception?.stack,
      });
    }
  }
}
