import { Injectable } from "@nestjs/common";

import { Area, Report, ReportStatus } from "@prisma/client";
import { DatabaseService } from "libs/common/database/database.service";
import { CreateReportDto } from "./dtos/create-report.dto";
import { PaginationReportDto } from "./dtos/pagination-report.dto";
import { MetricsReportDto } from "./dtos/metrics.dto";

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
                report_image_url: imageUrl,
                area: dto.area,
            },
        });
    }


    async findById(id: string) {
        return this.db.report.findUnique({
            where: { id },
            include: { assigned_to: true, },
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
    async assignAndStart(reportId: string, userId: string) {
        return this.db.report.update({
            where: { id: reportId },
            data: {
                assigned_to_id: userId,
                status: ReportStatus.IN_PROGRESS
            }
        })
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

    async resolveReport(reportId: string, resolvedImageUrl: string) {
        return this.db.report.update({
            where: {
                id: reportId
            },
            data: { resolved_image_url: resolvedImageUrl, resolved_at: new Date(), status: ReportStatus.RESOLVED }
        })

    }

    async reports(query: PaginationReportDto): Promise<{ items: Report[]; totalItems: number }> {
        const { page, pageSize, from, status, to, area, assignedToId, unassignedOnly } = query

        const skip = (page - 1) * pageSize;

        const where: any = {
            AND: [],
        };

        if (status?.length) {
            where.AND.push({
                status: {
                    in: status,
                },
            });
        }

        if (from) {
            where.AND.push({
                created_at: {
                    gte: new Date(from),
                },
            });
        }

        if (to) {
            where.AND.push({
                created_at: {
                    lte: new Date(to),
                },
            });
        }

        if (area) {
            where.AND.push({

                area: area
            })
        }
        if (assignedToId) {
            where.AND.push({
                assigned_to_id: assignedToId
            })
        }

        if (unassignedOnly) {
            where.AND.push({
                assigned_to_id: null
            })
        }

        if (where.AND.length === 0) {
            delete where.AND;
        }



        const [items, totalItems] = await Promise.all([
            this.db.report.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: {
                    created_at: "desc",
                },
            }),

            this.db.report.count({
                where,
            }),
        ]);

        return {
            items,
            totalItems,
        };
    }

    async metrics(query: MetricsReportDto) {
        const { from, to } = query;

        const dateFilter =
            from || to
                ? {
                    created_at: {
                        gte: from,
                        lte: to,
                    },
                }
                : {};

        const [
            totalReports,
            totalUsers,
            pendingReports,
            resolvedReports,
            recentReports,
            incidentsByArea,
        ] = await Promise.all([
            this.db.report.count({ where: dateFilter }),
            this.db.user.count(),

            this.db.report.count({
                where: {
                    ...dateFilter,
                    status: ReportStatus.PENDING,
                },
            }),

            this.db.report.count({
                where: {
                    ...dateFilter,
                    status: ReportStatus.RESOLVED,
                },
            }),

            this.db.report.findMany({
                where: dateFilter,
                orderBy: { created_at: 'desc' },
                take: 3,
                select: {
                    id: true,
                    status: true,
                    area: true,
                    created_at: true,
                    incident_type:true
                },
            }),

            this.db.report.groupBy({
                by: ['area'],
                where: dateFilter,
                _count: {
                    area: true,
                },
                orderBy: {
                    _count: {
                        area: 'desc',
                    },
                },
            }),
        ]);

        const resolutionRate =
            totalReports === 0
                ? 0
                : (resolvedReports / totalReports) * 100;

        return {
            totalReports,
            totalUsers,
            pendingReports,
            resolvedReports,
            resolutionRate: Number(resolutionRate.toFixed(2)),
            recentReports,
            incidentsByArea: incidentsByArea.map((item) => ({
                area: item.area,
                total: item._count.area,
            })),
        };
    }


}
