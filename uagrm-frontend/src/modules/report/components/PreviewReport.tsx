"use client";

import { useReport } from "../hooks/report.hook";

import ReportInfo from "./ReportInfo";
import ReportMap from "./ReportMap";
import ReportTimeline from "./ReportTimeline";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import AssignmentReport from "./AssingReport";

interface Props {
  id: string;
}

export default function PreviewReport({ id }: Props) {
  const { report, loading } = useReport(id);

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
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <AssignmentReport/>
      

      {/* Grid de 2 columnas: Info + Evidence */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ReportInfo report={report} />
        <ReportMap latitude={report.latitude} longitude={report.longitude} />
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


    </div>
  );
}