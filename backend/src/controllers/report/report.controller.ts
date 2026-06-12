import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";
import { CreateReportDto } from "libs/common/modules/report/dtos/create-report.dto";
import { ReportService } from "libs/common/modules/report/report.service";
import { Public } from "@app/auth/decorators/auth.decorator";
import { PaginationReportDto } from "libs/common/modules/report/dtos/pagination-report.dto";
import { HttpResponse } from "@app/common/errors/httpResponse";
import { Throttle } from "@nestjs/throttler";

@Controller("reports")
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
    ) { }

    @Public()
    @Post()
    @Throttle({ short: { limit: 1, ttl: 1000 } })
    @UseInterceptors(FileInterceptor("image"))
    async create(
        @Body() dto: CreateReportDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const result = this.reportService.create(dto, file);
          return HttpResponse.Success(result);
    }

    @Get(":id")
    async findById(
        @Param("id") id: string,
    ) {
        const result = await this.reportService.findById(id);
        console.log(result);
        return HttpResponse.Success(result);
    }

    @Public()
    @Get('')
    async getReports(@Req() req: Request, @Query() query: PaginationReportDto) {
        console.log(query)
        const result = await this.reportService.reports(query);
        return HttpResponse.Success(result);
    }

    @Put(":id")
    async assign(
        @Param("id") id: string,
        @Body("userId") userId: string,
    ) {
        const result = await this.reportService.assign(id, userId);
        return HttpResponse.Success(result);
}
}