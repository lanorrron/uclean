import { BaseError, TError } from "@app/common/errors/baseError";
import { ErrorType } from "@app/common/errors/errorType";
import { HttpStatus } from "@nestjs/common";

export class NotAuthorizedError extends BaseError {
    constructor(params: Partial<TError> = {}) {
        super({
            message: params.message ?? 'Not authorized',
            type: params.type ?? ErrorType.Auth,
            code: params.code ?? 'O-40300',
            detail: params.detail ?? 'Not authorized',
            statusCode: params.statusCode ?? HttpStatus.FORBIDDEN,
            params: params.params,
            requestId: params.requestId,
        })

    }
}