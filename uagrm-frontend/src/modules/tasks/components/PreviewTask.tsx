"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

import ReportInfo from "@/modules/report/components/ReportInfo";
import ReportMap from "@/modules/report/components/ReportMap";
import ReportTimeline from "@/modules/report/components/ReportTimeline";
import SolveReport from "@/modules/report/components/SolveReport";
import { useReport } from "@/modules/report/hooks/useReport.hook";
import { AlertTriangle } from "lucide-react";

interface Props {
  id: string;
}

export default function PreviewTask({ id }: Props) {
  const router = useRouter();
  const { report, loading, refetch } = useReport(id);

  if (loading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto p-6">
        <Skeleton className="h-12 w-72" />
        <Skeleton className="h-[400px]" />
        <div className="grid lg:grid-cols-2 gap-6">
          <Skeleton className="h-[350px]" />
          <Skeleton className="h-[350px]" />
        </div>
        <Skeleton className="h-[200px]" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Reporte no encontrado</h2>
        <p className="text-muted-foreground mt-2">El reporte que buscas no existe o fue eliminado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 ">
      {/* Header con título y botón de volver */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
<Button
  variant="ghost"
  size="sm"
  onClick={() => router.back()}
  className="hidden md:flex gap-2 -ml-2"
>
  <ArrowLeft className="h-4 w-4" />
  Volver
</Button>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Reporte #{report.id.slice(0, 8)}
            </h1>
          </div>
        </div>
        <SolveReport reportId={id} onSuccess={refetch} />
      </div>

      <ReportTimeline
        items={[
          {
            title: "Reportado",
            completed: true,
            active: false,
          },
          {
            title: "Asignado",
            completed: !!report.assigned_to_id,
            active: false,
          },
          {
            title: "Progreso",
            completed: report.status === "RESOLVED" || report.status === "IN_PROGRESS",
            active: report.status === "IN_PROGRESS",
          },
          {
            title: "Resuelto",
            completed: report.status === "RESOLVED",
            active: false,
          },
        ]}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <ReportInfo report={report} />
        <ReportMap latitude={report.latitude} longitude={report.longitude} />
      </div>
    </div>
  );
}