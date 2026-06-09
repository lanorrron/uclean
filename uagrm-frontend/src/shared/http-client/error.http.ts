export class ErrorHttp extends Error {
  errors: Array<string>;
  code: number;
  constructor(message: string, code: number = 500, errors: Array<string> = []) {
    super();
    this.errors = errors;
    this.code = code;
    this.message = message;
  }
}
