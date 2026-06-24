import { UserType } from "@/modules/user/types/user.type";
import { DatePreset, IncidentType } from "../type/report.type";

export function getUserType(value: UserType) {
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

export function getIncidentType(value: IncidentType) {
    switch (value) {
        case IncidentType.WASTE:
            return { label: "Residuos Sólidos", icon: "🗑️", color: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300" };
        case IncidentType.BATHROOM:
            return { label: "Baños / Sanitarios", icon: "🚽", color: "bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300" };
        case IncidentType.LIGHTING:
            return { label: "Iluminación", icon: "💡", color: "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300" };
        case IncidentType.FURNITURE:
            return { label: "Mobiliario Dañado", icon: "🪑", color: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300" };
        case IncidentType.SECURITY:
            return {
                label: "Seguridad",
                icon: "🛡️",
                color: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"
            };
        default:
            return { label: value, icon: "📌", color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" };
    }
}

export function getStatusChipVariant(status: string): "error" | "success" | "warning" | "info" | "default" {
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

export function formatReportDate(date: Date | string) {
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


// Formatear el status para mostrar legible
export const formatStatusLabel = (status: string) => {
    return status.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

const applyPreset = (preset: DatePreset) => {
    const now = new Date();

    switch (preset) {
        case "today":
            return {
                from: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                to: now,
            };

        case "7d":
            return {
                from: new Date(now.setDate(now.getDate() - 7)),
                to: new Date(),
            };

        case "month":
            return {
                from: new Date(now.getFullYear(), now.getMonth(), 1),
                to: new Date(),
            };

        default:
            return undefined;
    }
};

export const getLast7Days = () => {

    const now = new Date();

    const from = new Date();

    from.setDate(now.getDate() - 7);

    return {
        from: from.toISOString(),

        to: now.toISOString(),
    };
};

// utils/reportTimeline.ts
import { Report } from "../type/report.type";

export const getTimelineItems = (report: Report) => {
    const isAssigned = !!report.assigned_to_id;
    const isInProgress = report.status === "IN_PROGRESS";
    const isResolved = report.status === "RESOLVED";
    const isRejected = report.status === "REJECTED";

    // Si está rechazado, mostramos solo hasta Asignado
    if (isRejected) {
        return [
            { title: "Reportado", date: report.created_at, completed: true, active: false },
            { title: "Asignado", completed: false, active: false },
            { title: "Rechazado", completed: true, active: true },
        ];
    }

    return [
        {
            title: "Reportado",
            date: report.created_at,
            completed: true,
            active: false,
        },
        {
            title: "Asignado",
            date: isAssigned ? report.updated_at : undefined,
            completed: isAssigned,
            active: false,
        },
        {
            title: "Progreso",
            completed: isResolved || isInProgress,
            active: isInProgress && !isResolved,
        },
        {
            title: "Resuelto",
            completed: isResolved,
            active: false,
        },
    ];
};