import { BaseError, TError } from "@app/common/errors/baseError";
import { ErrorType } from "@app/common/errors/errorType";
import { HttpStatus } from "@nestjs/common";

export class UserNotFoundError extends BaseError {
    constructor(params: Partial<TError> = {}) {
        super({
            message: params.message ?? 'User not found',
            type: params.type ?? ErrorType.Auth,
            code: params.code ?? 'O-40000',
            detail: params.detail ?? 'User not found',
            statusCode: params.statusCode ?? HttpStatus.NOT_FOUND,
            params: params.params,
            requestId: params.requestId,
        })

    }
}