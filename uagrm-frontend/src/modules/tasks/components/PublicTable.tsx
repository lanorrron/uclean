"use client";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Chip } from "@/components/ui/chip";
import { MapPin, Calendar, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { formatReportDate, formatStatusLabel, getIncidentType, getStatusChipVariant, getUserType } from "@/modules/report/utils/utils.report";

import { Report, ReportStatus } from "../../report/type/report.type";
import { useAssignment } from "@/modules/report/hooks/useAssignment.hook";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useAssignAndStart } from "@/modules/report/hooks/useAssignAndStart";


interface ListReportProps {
    reports: Report[];
    loading?: boolean;
}

export default function ListTasks({ reports, loading }: ListReportProps) {
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
    const router = useRouter()
    const { assignAndStart } = useAssignAndStart()


    const handleImageError = (reportId: string) => {
        setImageErrors(prev => ({ ...prev, [reportId]: true }));
    };
    const handleAssing = async (reportId: string) => {
        await assignAndStart(reportId);
        router.push(`/tasks/${reportId}`);

    }


    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!reports.length) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">No hay reportes aún</h3>
            </div>
        );
    }



    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 g-red">
            {reports.map((report) => {
                const userInfo = getUserType(report.user_type);
                const incidentInfo = getIncidentType(report.incident_type);

                return (
                    <div
                        key={report.id}
                        className="group"
                    >
                        <Card className="p-4   shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden  hover:border-primary/30 dark:hover:border-primary/40">
                            <div className="flex gap-4">
                                {/* Imagen con hover effect */}
                                <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                                    {!imageErrors[report.id] ? (
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            src={
                                                report.report_image_url ||
                                                "https://placehold.co/400x400/f0fdf4/166534?text=📸"
                                            }
                                            alt={report.incident_type}
                                            onError={() => handleImageError(report.id)}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-4xl">{incidentInfo.icon}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Contenido */}
                                <div className="flex-1 flex flex-col min-w-0">
                                    {/* Header con status y fecha */}
                                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                        <Chip
                                            label={formatStatusLabel(report.status)}
                                            variant={getStatusChipVariant(report.status)}
                                        />
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            <span>{formatReportDate(report.created_at)}</span>
                                        </div>
                                    </div>

                                    {/* Título */}
                                    <h3 className="font-bold text-foreground text-base line-clamp-1">
                                        {incidentInfo.label}
                                    </h3>

                                    {/* Ubicación */}
                                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                        <MapPin className="w-3.5 h-3.5 text-primary" />
                                        <span className="font-mono text-[11px]">
                                            {report.latitude.toFixed(4)}°, {report.longitude.toFixed(4)}°
                                        </span>
                                    </div>

                                    {/* Descripción */}
                                    {report.description && (
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                                            {report.description}
                                        </p>
                                    )}

                                    {/* Footer con usuario y acción */}
                                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-6 h-6 rounded-full ${userInfo.color} flex items-center justify-center text-sm`}>
                                                {userInfo.icon}
                                            </div>
                                            <span className="text-xs font-medium text-muted-foreground">
                                                {userInfo.label}
                                            </span>
                                        </div>

                                        <a onClick={() => handleAssing(report.id,)} className="text-primary font-semibold text-xs flex items-center gap-1 hover:gap-2 transition-all duration-200 group/btn cursor-pointer">
                                            Iniciar trabajo
                                            <MdOutlineKeyboardArrowRight className="text-base group-hover/btn:translate-x-0.5 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Barra de progreso animada al hover */}
                        <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                );
            })}
        </div>
    );
}