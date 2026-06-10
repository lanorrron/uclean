"use client";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useReports } from "../hooks/report.hook";
import { Chip } from "@/components/ui/chip";
import { MapPin, Calendar, AlertCircle } from "lucide-react";
import { IncidentType, UserType } from "../type/report.type";
import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function ListReport() {
    const { reports, loading } = useReports();
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground mt-4 font-medium">Cargando reportes...</p>
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
                <p className="text-muted-foreground mt-2">Sé el primero en reportar un incidente</p>
            </div>
        );
    }

    function getUserType(value: UserType) {
        switch (value) {
            case UserType.STUDENT:
                return { label: "Estudiante", icon: "🎓", color: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300" };
            case UserType.TEACHER:
                return { label: "Docente", icon: "👨‍🏫", color: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300" };
            case UserType.VISITOR:
                return { label: "Visitante", icon: "👤", color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" };
            default:
                return { label: value, icon: "👤", color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" };
        }
    }

    function getIncidentType(value: IncidentType) {
        switch (value) {
            case IncidentType.WASTE:
                return { label: "Residuos Sólidos", icon: "🗑️", color: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300" };
            case IncidentType.BATHROOM:
                return { label: "Baños / Sanitarios", icon: "🚽", color: "bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300" };
            case IncidentType.LIGHTING:
                return { label: "Iluminación", icon: "💡", color: "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300" };
            case IncidentType.FURNITURE:
                return { label: "Mobiliario Dañado", icon: "🪑", color: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300" };
            case IncidentType.OTHER:
                return { label: "Otros", icon: "📌", color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" };
            default:
                return { label: value, icon: "📌", color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" };
        }
    }

    function getStatusChipVariant(status: string): "error" | "success" | "warning" | "info" | "default" {
        switch (status.toUpperCase()) {
            case "PENDING":
                return "error"; 
            case "IN_PROGRESS":
                return "info";
            case "RESOLVED":
                return "success";
            case "REJECTED":
                return "error";
            default:
                return "default";
        }
    }

    function formatReportDate(date: Date | string) {
        const reportDate = new Date(date);
        const now = new Date();
        const diffMs = now.getTime() - reportDate.getTime();
        const hours = Math.floor(diffMs / (1000 * 60 * 60));

        if (hours < 1) {
            const minutes = Math.floor(diffMs / (1000 * 60));
            if (minutes < 1) return "Hace unos segundos";
            return `Hace ${minutes} min`;
        }
        if (hours <= 48) return `Hace ${hours} h`;

        return reportDate.toLocaleDateString("es-BO", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    const handleImageError = (reportId: string) => {
        setImageErrors(prev => ({ ...prev, [reportId]: true }));
    };

    // Formatear el status para mostrar legible
    const formatStatusLabel = (status: string) => {
        return status.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    };

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
                                                report.image_url ||
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

                                        <button className="text-primary font-semibold text-xs flex items-center gap-1 hover:gap-2 transition-all duration-200 group/btn cursor-pointer">
                                            Ver Detalles
                                            <MdOutlineKeyboardArrowRight className="text-base group-hover/btn:translate-x-0.5 transition-transform" />
                                        </button>
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