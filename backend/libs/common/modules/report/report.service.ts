import { Injectable } from "@nestjs/common";
import { ReportRepository } from "./report.repository";
import { SupabaseStorageService } from "./supabase/supabase-storage.service";
import { CreateReportDto } from "./dtos/create-report.dto";
import { PaginationReportDto } from "./dtos/pagination-report.dto";
import { PagedData } from "@app/common/model/response.model";
import { Report } from "@prisma/client";
import { ReportNotFound } from "./errors/report.error";


@Injectable()
export class ReportService {
    constructor(
        private readonly reportRepository: ReportRepository,
        private readonly storageService: SupabaseStorageService,
    ) { }

    async create(
        dto: CreateReportDto,
        file?: Express.Multer.File,
    ) {
        let imageUrl: string | undefined;

        if (file) {
            imageUrl = await this.storageService.uploadImage(file);
        }

        return this.reportRepository.create(
            dto,
            imageUrl,
        );
    }


    async findById(id: string) {
        const report = await this.reportRepository.findById(id);
        if (!report) {
            throw new ReportNotFound();
        }
        return report;
    }

    async assign(reportId: string, userId: string) {
        await this.findById(reportId);
        return this.reportRepository.assign(reportId, userId);
    }

    async reports(data: PaginationReportDto): Promise<PagedData<Report>> {
        const { page, pageSize, from, status, to } = data;
        const { items, totalItems } = await this.reportRepository.reports({ page, pageSize, from, status, to });
        const totalPages = Math.ceil(totalItems / pageSize);
        return {
            items,
            meta: { pageSize, currentPage: page, totalPages, totalItems },
        };
    }

}