import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLoggerService } from '../appLogger/appLogger.service';
import { BaseError } from './baseError';
import { ThrottlerException } from '@nestjs/throttler';


@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new AppLoggerService();

  catch(exception: BaseError | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = (request.headers['x-vm-request-id'] as string) || 'unknown';

    if (exception instanceof ThrottlerException) {
      const retryAfterSeconds = (request as any).retryAfterSeconds || 60;
      const baseError = new BaseError({
        message: exception.message,
        type: 'TooManyRequests',
        code: 'TOO_MANY_REQUESTS',
        detail: `Request limit exceeded`,
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        requestId,
      });
      const errorWithRetry = { ...baseError, retryAfterSeconds };

      return response.status(HttpStatus.TOO_MANY_REQUESTS).json({
        success: false,
        error: errorWithRetry,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        requestId,
      });
    }

    if (!(exception instanceof HttpException)) {
      const errorProperties = Object.getOwnPropertyNames(exception);
      const errorDetails = errorProperties.reduce((acc, key) => {
        acc[key] = exception[key];
        return acc;
      }, {});

      this.logger.error('unhandled_error', {
        error: {
          requestId,
          ...errorDetails,
        },
      });

      exception = new BaseError({
        message: 'Internal server error',
        type: 'InternalServerError',
        code: 'INTERNAL_SERVER_ERROR',
        detail: 'An internal server error occurred',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        requestId: requestId,
      });
    }

    if (exception instanceof HttpException && exception.getResponse() instanceof Object) {
      const responseBody = exception.getResponse();
      const statusCode = exception.getStatus();

      if (statusCode == HttpStatus.BAD_REQUEST && responseBody['message'] && Array.isArray(responseBody['message'])) {
        const validationErrors = responseBody['message'];

        const errorParams: Record<string, any> = {};

        validationErrors.forEach((error) => {
          const field = error.trim().split(/\s+/)[0];
          if (errorParams[field]) {
            errorParams[field] = errorParams[field] + ', ' + error;
          } else {
            errorParams[field] = error;
          }
        });

        exception = new BaseError({
          message: 'Bad Request',
          type: 'BadRequest',
          code: 'BAD_REQUEST',
          detail: 'Validation failed',
          statusCode: HttpStatus.BAD_REQUEST,
          requestId: requestId,
          params: errorParams,
        });
      }
    }

    const statusCode = exception.getStatus();

    response.status(statusCode).json({
      success: false,
      error: {
        message: exception.message,
        type: exception.type,
        code: exception.code,
        detail: exception.detail,
        requestId: exception.requestId,
        params: exception.params,
      },
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      requestId,
    });
  }
}