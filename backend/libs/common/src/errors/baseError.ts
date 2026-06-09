import { HttpException, HttpStatus } from '@nestjs/common';

export interface TError {
  message: string;
  type: string;
  code: string;
  detail: string;
  requestId?: string;
  statusCode: HttpStatus;
  params?: Record<string, any>;
}

export class BaseError extends HttpException implements Omit<TError, 'statusCode'> {
  message: string;
  type: string;
  code: string;
  detail: string;
  requestId?: string;
  params?: Record<string, any>;
  constructor(params: TError) {
    super(params.message, params.statusCode);
    this.message = params.message;
    this.type = params.type;
    this.code = params.code;
    this.detail = params.detail;
    this.requestId = params.requestId;
    this.params = params.params;
  }

  setRequestId(requestId: string): void {
    this.requestId = requestId;
  }
}