import { Type } from "class-transformer";
import {
    IsDate,
    IsEnum,
    IsInt,
    IsOptional,
    Min,
    ValidateNested,
} from "class-validator";

import { ReportQueryDto } from "./report-query.dto";
import { ReportStatus } from "@prisma/client";

export class PaginationReportDto {

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(1)
    page: number = 1;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(1)
    pageSize: number = 10;

    @IsOptional()
    @IsEnum(ReportStatus)
    status?: ReportStatus;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    from?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    to?: Date;
}