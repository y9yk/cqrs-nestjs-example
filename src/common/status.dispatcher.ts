import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { ResponseDto } from './dto/base.response.dto';

export const messages = {
  200: '성공',
  400: '요청하신 정보를 확인해주세요.',
  401: '인증되지 않았습니다.',
  404: '요청하신 정보를 찾을 수 없습니다.',
  409: '해당 값이 이미 존재합니다.',
  500: '서버에 문제가 생겼습니다.',
};

export const success = (results: any): ResponseDto => {
  return {
    statusCode: 200,
    message: messages[200],
    results,
  };
};

// This is an error wrapper to use global http-exception-filter.
export const throwError = (e: Error) => {
  if (e instanceof HttpException) {
    throw e;
  } else {
    // caught not-handled error
    throw new InternalServerErrorException({
      statusCode: 500,
      message: e.message,
      error: e.stack,
    });
  }
};
