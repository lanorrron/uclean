import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  debug: 3,
  trace: 4,
  info: 5,
};

@Injectable()
export class AppLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      levels: logLevels,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [new winston.transports.Console({ level: 'info' })],
    });
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any, object: object) {
    this.logger.info(message, object);
  }

  /**
   * Write a 'info' level log.
   */
  info(message: any, object: object) {
    this.logger.info(message, object);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, object: object) {
    this.logger.error(message, object);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, object: object) {
    this.logger.warn(message, object);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, object: object) {
    this.logger.debug(message, object);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, object: object) {
    this.logger.verbose(message, object);
  }
}