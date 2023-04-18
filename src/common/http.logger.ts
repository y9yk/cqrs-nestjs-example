import { LoggerService as LS } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

const { errors, combine, json, timestamp, ms, prettyPrint } = winston.format;
// future work
// connect logger to Google Cloud Storage

export class HttpLogger implements LS {
  private logger: winston.Logger;

  constructor(private configService: ConfigService) {
    this.logger = winston.createLogger({
      format: combine(
        errors({ stack: true }),
        json(),
        timestamp({ format: 'isoDateTime' }),
        ms(),
        prettyPrint(),
      ),
      transports: [
        new winston.transports.Console({
          level: this.configService.get<string>('service.log_level'),
          format: combine(nestWinstonModuleUtilities.format.nestLike()),
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  info(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warning(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
