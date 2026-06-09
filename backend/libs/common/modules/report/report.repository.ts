import { Injectable } from "@nestjs/common";

import { Report, ReportStatus } from "@prisma/client";
import { DatabaseService } from "libs/common/database/database.service";
import { CreateReportDto } from "./dtos/create-report.dto";

@Injectable()
export class ReportRepository {
    constructor(private readonly db: DatabaseService) { }

    async create(
        dto: CreateReportDto,
        imageUrl?: string
    ) {
        return this.db.report.create({
            data: {
                user_type: dto.userType,
                register_number: dto.registerNumber,
                incident_type: dto.incidentType,
                description: dto.description,
                latitude: dto.latitude,
                longitude: dto.longitude,
                image_url: imageUrl,
            },
        });
    }


    async findById(id: string) {
        return this.db.report.findUnique({
            where: { id },
        });
    }

    async updateStatus(id: string, status: ReportStatus) {
        return this.db.report.update({
            where: { id },
            data: {
                status,
            },
        });
    }

    async assign(reportId: string, userId: string) {
        return this.db.report.update({
            where: {
                id: reportId,
            },
            data: {
                assigned_to_id: userId,
            },
        });
    }

    async reports(page: number, pageSize: number, search?: string, status?: string): Promise<{ items: Report[], totalItems: number }> {
        const skip = (page - 1) * pageSize;

        const where: any = {}

        if (status && status.trim() !== "") {
            where.AND.push({
                status: { equals: status }
            })
        }
        const [items, totalItems] = await Promise.all([
            this.db.report.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { created_at: 'desc' },
            }),
            this.db.report.count({
                where
            })
        ])
        return { items, totalItems };
    }

}
