import { BaseException } from './base.exception';

export class BadRequestException extends BaseException {
  constructor() {
    super(400);
  }
}

export class UnAuthorizedException extends BaseException {
  constructor() {
    super(401);
  }
}

export class NotFoundException extends BaseException {
  constructor() {
    super(404);
  }
}

export class ConflictException extends BaseException {
  constructor() {
    super(409);
  }
}
