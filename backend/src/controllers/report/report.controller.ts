import {
    BadRequestException,
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
import sharp from "sharp";
import { MetricsReportDto } from "libs/common/modules/report/dtos/metrics.dto";

@Controller("reports")
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
    ) { }

    @Public()
    @Post()
    @Throttle({ short: { limit: 1, ttl: 1000 } })
    @UseInterceptors(
        FileInterceptor("image", {
            limits: {
                fileSize: 5 * 1024 * 1024, // 5MB
            },
            fileFilter: (req, file, cb) => {
                const allowed = ["image/jpeg", "image/png", "image/webp"];

                if (!allowed.includes(file.mimetype)) {
                    return cb(new BadRequestException("Solo imágenes válidas"), false);
                }

                cb(null, true);
            },
        }),
    )
    async create(
        @Body() dto: CreateReportDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        let processedFile: Express.Multer.File | undefined;

        if (file) {

            try {
                const buffer = await sharp(file.buffer)
                    .rotate()
                    .resize({
                        width: 1280,
                        withoutEnlargement: true,
                    })
                    .jpeg({ quality: 80 })
                    .toBuffer();

                processedFile = {
                    ...file,
                    buffer,
                    mimetype: "image/jpeg",
                };
            } catch (err) {
                throw new BadRequestException("Archivo de imagen inválido");
            }
        }

        const result = await this.reportService.create(dto, processedFile);

        return HttpResponse.Success(result);
    }

    @Get('metrics')
    async metrics(@Query() query: MetricsReportDto) {
        const result = await this.reportService.metrics(query);
        return HttpResponse.Success(result);
    }

    @Get(":id")
    async findById(
        @Param("id") id: string,
    ) {
        const result = await this.reportService.findById(id);
        return HttpResponse.Success(result);
    }

    @Get('')
    async getReports(@Req() req: Request, @Query() query: PaginationReportDto) {
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

    @Put(":id/assign-and-start")
    async assignAndStart(
        @Param("id") id: string,
        @Req() req: any
    ) {
        const result = await this.reportService.assignAndStart(
            id,
            req.user.userId
        );

        return HttpResponse.Success(result);
    }

    @Put(":id/resolve")
    @UseInterceptors(
        FileInterceptor("image", {
            limits: {
                fileSize: 5 * 1024 * 1024, // 5MB
            },
            fileFilter: (req, file, cb) => {
                const allowed = ["image/jpeg", "image/png", "image/webp"];

                if (!allowed.includes(file.mimetype)) {
                    return cb(new BadRequestException("Solo imágenes válidas"), false);
                }

                cb(null, true);
            },
        }),
    )
    async resolveReport(
        @Param("id") reportId: string,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const result = await this.reportService.resolveReport(reportId, file);

        return HttpResponse.Success(result);
    }


}