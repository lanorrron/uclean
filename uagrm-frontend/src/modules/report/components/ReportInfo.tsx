"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  AlertCircle,
  ImageIcon,
  CheckCircle2,
  Clock as ClockIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Chip } from "@/components/ui/chip";

import { Report } from "../type/report.type";
import {
  formatStatusLabel,
  getIncidentType,
  getStatusChipVariant,
  getUserType,
} from "../utils/utils.report";

interface Props {
  report: Report;
}

export default function ReportInfo({ report }: Props) {
  const [imageError, setImageError] = useState(false);
  const incidentConfig = getIncidentType(report.incident_type);
  const userConfig = getUserType(report.user_type);
  
  const formattedDate = new Date(report.created_at).toLocaleDateString("es-BO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = new Date(report.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="border-border/50 shadow-sm overflow-hidden">
      {/* Header con estado y tipo */}
      <CardHeader className="pb-4 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl">{incidentConfig.icon}</span>
            <Chip label={incidentConfig.label} variant="warning" />
          </div>
          <Chip
            label={formatStatusLabel(report.status)}
            variant={getStatusChipVariant(report.status)}
          />
        </div>

        <div>
          <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
            #{report.id.slice(0, 8)}...{report.id.slice(-4)}
          </code>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{formattedTime}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-0">
        {/* Grid superior: Información del reporte */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Reportado por */}
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Reportado por
            </h3>
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full ${userConfig.color} flex items-center justify-center text-base shadow-sm`}
              >
                {userConfig.icon}
              </div>
              <div>
                <p className="text-sm font-medium">{userConfig.label}</p>
                {report.register_number && (
                  <p className="text-xs text-muted-foreground">
                    Registro N°: {report.register_number ?? "Desconocido"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Descripción del incidente
            </h3>
            <div className="p-3 bg-muted/20 rounded-lg border border-border/30 min-h-[60px]">
              <p className="text-sm leading-relaxed">
                {report.description || (
                  <span className="text-muted-foreground italic flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Sin descripción adicional
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Sección de imágenes - Abajo con tamaño equilibrado */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Evidencias fotográficas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ANTES */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">Antes</p>
              </div>

              {report.report_image_url ? (
                <div className="rounded-lg overflow-hidden border border-border/50 bg-muted/10 aspect-[4/3]">
                  <img
                    src={report.report_image_url}
                    alt="Antes"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-border/50 bg-muted/5 aspect-[4/3] flex flex-col items-center justify-center">
                  <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground mt-2">Sin imagen</p>
                </div>
              )}
            </div>

            {/* DESPUÉS */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {report.resolved_image_url ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <ClockIcon className="h-4 w-4 text-yellow-500" />
                )}
                <p className="text-sm font-medium text-muted-foreground">Después</p>
                {!report.resolved_image_url && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                    Pendiente
                  </span>
                )}
              </div>

              {report.resolved_image_url ? (
                <div className="rounded-lg overflow-hidden border border-border/50 bg-muted/10 aspect-[4/3]">
                  <img
                    src={report.resolved_image_url}
                    alt="Después"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-yellow-400/40 bg-gradient-to-br from-yellow-50/10 to-yellow-100/10 aspect-[4/3] flex flex-col items-center justify-center">
                  <ClockIcon className="h-12 w-12 text-yellow-500/60" />
                  <p className="text-sm font-medium text-yellow-600 mt-2">
                    Pendiente
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Trabajo en progreso
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}