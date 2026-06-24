// components/ui/generate-report-button.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Download,
  Loader2,
  FileSpreadsheet,
  FileText,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast"
import { format } from "date-fns";
import { es } from "date-fns/locale";
import * as XLSX from "xlsx";
import { MetricsReportResponse } from "../type/report.type";

// Definimos el tipo de datos que espera el componente


interface GenerateReportButtonProps {
  data: MetricsReportResponse | null;
  dateRange?: {
    from?: Date;
    to?: Date;
  };
  disabled?: boolean;
}

export function GenerateReport({ 
  data, 
  dateRange, 
  disabled 
}: GenerateReportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportType, setExportType] = useState<"excel" | "csv">("excel");

  // Función para formatear fechas
  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy", { locale: es });
  };

  // Función para obtener el nombre del archivo
  const getFileName = (extension: string) => {
    const dateStr = format(new Date(), "yyyy-MM-dd_HH-mm");
    const rangeStr = dateRange?.from && dateRange?.to
      ? `_${formatDate(dateRange.from)}_al_${formatDate(dateRange.to)}`
      : "";
    return `reporte_dashboard${rangeStr}_${dateStr}.${extension}`;
  };

  // Función para preparar los datos del reporte
  const prepareReportData = () => {
    if (!data) return null;

    // Datos para la hoja de resumen
    const summaryData = [
      ["REPORTE DE DASHBOARD - CAMPUS LIMPIO UAGRM"],
      ["Fecha de generación:", format(new Date(), "dd/MM/yyyy HH:mm:ss", { locale: es })],
      ["Rango de fechas:", dateRange?.from && dateRange?.to 
        ? `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
        : "Todos los periodos"],
      [],
      ["MÉTRICAS PRINCIPALES"],
      ["Métrica", "Valor"],
      ["Usuarios Activos", data.totalUsers],
      ["Reportes Totales", data.totalReports],
      ["Reportes Pendientes", data.pendingReports],
      ["Reportes Resueltos", data.resolvedReports],
      ["Tasa de Resolución", `${data.resolutionRate}%`],
      [],
    ];

    // Datos de incidentes por área
    const areaData = [
      ["INCIDENTES POR ÁREA"],
      ["Área", "Cantidad de Incidentes"],
      ...data.incidentsByArea.map(area => [
        area.area.replace(/_/g, " "),
        area.total
      ]),
      [],
    ];

    // Datos de reportes recientes
    const recentReportsData = [
      ["REPORTES RECIENTES"],
      ["ID", "Tipo", "Estado", "Área", "Descripción", "Fecha"],
      ...data.recentReports.map(report => [
        report.id,
        getIncidentLabel(report.incident_type),
        getStatusLabel(report.status),
        report.area.replace(/_/g, " "),
        report.description || "Sin descripción", // Manejar null/undefined
        format(new Date(report.created_at), "dd/MM/yyyy HH:mm", { locale: es })
      ]),
    ];

    return {
      summary: summaryData,
      areas: areaData,
      reports: recentReportsData,
    };
  };

  // Función para generar Excel
  const generateExcel = () => {
    try {
      const reportData = prepareReportData();
      if (!reportData) {
        toast.error("No hay datos para generar el reporte");
        return;
      }

      // Crear libro de trabajo
      const wb = XLSX.utils.book_new();

      // Hoja de resumen
      const wsSummary = XLSX.utils.aoa_to_sheet(reportData.summary);
      XLSX.utils.book_append_sheet(wb, wsSummary, "Resumen");

      // Hoja de áreas
      const wsAreas = XLSX.utils.aoa_to_sheet(reportData.areas);
      XLSX.utils.book_append_sheet(wb, wsAreas, "Áreas");

      // Hoja de reportes
      const wsReports = XLSX.utils.aoa_to_sheet(reportData.reports);
      XLSX.utils.book_append_sheet(wb, wsReports, "Reportes");

      // Ajustar anchos de columnas
      const wscols = [
        { wch: 30 },
        { wch: 30 },
        { wch: 30 },
        { wch: 30 },
        { wch: 40 },
        { wch: 30 },
        { wch: 30 },
      ];
      wsReports['!cols'] = wscols;

      // Generar archivo
      const wbout = XLSX.write(wb, { 
        bookType: 'xlsx', 
        type: 'array',
        bookSST: false,
      });

      // Descargar
      const blob = new Blob([wbout], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = getFileName('xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Reporte Excel generado exitosamente");
    } catch (error) {
      console.error("Error al generar Excel:", error);
      toast.error("Error al generar el reporte Excel");
    }
  };

  // Función para generar CSV
  const generateCSV = () => {
    try {
      const reportData = prepareReportData();
      if (!reportData) {
        toast.error("No hay datos para generar el reporte");
        return;
      }

      // Combinar todos los datos en un solo CSV
      const allData = [
        ...reportData.summary,
        ...reportData.areas,
        ...reportData.reports,
      ];

      // Convertir a CSV
      const csvContent = allData
        .map(row => row.join(','))
        .join('\n');

      // Crear y descargar archivo
      const blob = new Blob([csvContent], { 
        type: 'text/csv;charset=utf-8;' 
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = getFileName('csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Reporte CSV generado exitosamente");
    } catch (error) {
      console.error("Error al generar CSV:", error);
      toast.error("Error al generar el reporte CSV");
    }
  };

  // Función principal para generar reporte
  const handleGenerateReport = () => {
    if (!data) {
      toast.error("No hay datos para generar el reporte");
      return;
    }

    setIsGenerating(true);
    try {
      if (exportType === "excel") {
        generateExcel();
      } else {
        generateCSV();
      }
    } catch (error) {
      console.error("Error al generar reporte:", error);
      toast.error("Error al generar el reporte");
    } finally {
      setIsGenerating(false);
    }
  };

  // Funciones helper
  const getIncidentLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      'WASTE': "Residuos",
      'LIGHTING': "Iluminación",
      'BATHROOM': "Sanitarios",
      'FURNITURE': "Mobiliario",
      'SECURITY': "Seguridad"
    };
    return typeMap[type] || type;
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'PENDING': "Pendiente",
      'IN_PROGRESS': "En Progreso",
      'RESOLVED': "Resuelto",
      'REJECTED': "Rechazado"
    };
    return statusMap[status] || status;
  };

  const getUserTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      'STUDENT': "Estudiante",
      'TEACHER': "Docente",
      'VISITOR': "Visitante"
    };
    return typeMap[type] || type;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          size="sm" 
          className="gap-2 bg-primary hover:bg-primary/90 shadow-sm hover:shadow"
          disabled={disabled || isGenerating || !data}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Generar reporte
              <ChevronDown className="w-3 h-3" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem 
          onClick={() => {
            setExportType("excel");
            handleGenerateReport();
          }}
          className="gap-2 cursor-pointer"
          disabled={isGenerating}
        >
          <FileSpreadsheet className="w-4 h-4 text-green-600" />
          Exportar a Excel
          <span className="ml-auto text-xs text-muted-foreground">.xlsx</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            setExportType("csv");
            handleGenerateReport();
          }}
          className="gap-2 cursor-pointer"
          disabled={isGenerating}
        >
          <FileText className="w-4 h-4 text-blue-600" />
          Exportar a CSV
          <span className="ml-auto text-xs text-muted-foreground">.csv</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}