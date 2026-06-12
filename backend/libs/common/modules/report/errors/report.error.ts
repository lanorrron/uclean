import { BaseError, TError } from "@app/common/errors/baseError";
import { ErrorType } from "@app/common/errors/errorType";
import { HttpStatus } from "@nestjs/common";

export class ReportNotFound extends BaseError {
    constructor(params: Partial<TError> = {}) {
        super({
            message: params.message ?? 'Report not found',
            type: params.type ?? ErrorType.Report,
            code: params.code ?? 'O-40000',
            detail: params.detail ?? 'Report not found',
            statusCode: params.statusCode ?? HttpStatus.NOT_FOUND,
            params: params.params,
            requestId: params.requestId,
        })

    }
}