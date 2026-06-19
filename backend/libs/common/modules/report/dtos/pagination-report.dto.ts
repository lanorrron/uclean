import { Transform, Type } from "class-transformer";
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
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
    @Transform(({ value }) =>
        Array.isArray(value) ? value : [value]
    )
    @IsArray()
    @IsEnum(ReportStatus, { each: true })
    status?: ReportStatus[];

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

    @IsOptional()
    @IsString()
    assignedToId?: string;
    @IsOptional()

    @IsOptional()
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    unassignedOnly?: boolean;


}