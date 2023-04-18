import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { HttpLogger } from '../http.logger';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpLoggingMiddleware implements NestMiddleware {
  private logger: HttpLogger;
  constructor(private configService: ConfigService) {
    this.logger = new HttpLogger(configService);
  }

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const obj = {
        url: req.originalUrl,
        method: req.method,
        headers: req.headers,
        params:
          req.query && Object.keys(req.query).length > 0 ? req.query : req.body,
      };
      this.logger.info(JSON.stringify(obj, null, 2));
    });
    next();
  }
}
