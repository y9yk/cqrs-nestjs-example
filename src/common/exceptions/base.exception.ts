import { HttpException } from '@nestjs/common';
import { messages } from '../status.dispatcher';

export class BaseException extends HttpException {
  constructor(code: number) {
    super(
      {
        statusCode: code,
        message: messages[code],
      },
      code,
    );
  }
}
