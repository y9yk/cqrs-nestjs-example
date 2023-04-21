import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class BadRequestException extends BaseException {
  constructor() {
    super(HttpStatus.BAD_REQUEST);
  }
}

export class UnAuthorizedException extends BaseException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED);
  }
}

export class NotFoundException extends BaseException {
  constructor() {
    super(HttpStatus.NOT_FOUND);
  }
}

export class ConflictException extends BaseException {
  constructor() {
    super(HttpStatus.CONFLICT);
  }
}
