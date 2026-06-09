import { ReportStatus } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { IsOptional, IsInt, Min, IsEnum } from "class-validator";


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
    @IsEnum(ReportStatus, {
        message: `status must be one of: ${Object.values(ReportStatus).join(", ")}`,
    })
    @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
    status?: ReportStatus;
}