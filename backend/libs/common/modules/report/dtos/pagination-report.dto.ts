import { Type } from "class-transformer";
import {
    IsDate,
    IsEnum,
    IsInt,
    IsOptional,
    Min,
} from "class-validator";

import { Area, ReportStatus } from "@prisma/client";

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

    @IsOptional()
    @IsEnum(Area)
    area?: Area;


}