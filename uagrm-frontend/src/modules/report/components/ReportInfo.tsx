"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  ImageIcon,
  MapPin,
  User,
  AlertCircle,
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

      <CardContent className="space-y-5 pt-0">
        {/* Grid de 2 columnas: DESCRIPCIÓN | FOTO */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Columna izquierda - Descripción y datos */}
          <div className="space-y-4">
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
                      Registro N°: {report.register_number??"Desconocido"}
                    </p>
                  )}
                </div>
              </div>
            </div>
                      <Separator className="bg-border/50" />
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Descripción del incidente
              </h3>
              <div className="p-3 bg-muted/20 rounded-lg border border-border/30">
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

          {/* Columna derecha - Foto */}
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Evidencia fotográfica
            </h3>

            {report.image_url && !imageError ? (
              <div className="rounded-xl overflow-hidden border border-border/50 bg-muted/10 shadow-sm">
                <img
                  src={report.image_url}
                  alt="Evidencia del reporte"
                  className="w-full max-h-[280px] object-contain"
                  onError={() => setImageError(true)}
                />
                <div className="px-4 py-2.5 bg-muted/20 border-t border-border/50">
                  <p className="text-xs text-muted-foreground text-center">
                    📸 Capturada el {formattedDate} a las {formattedTime}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-[280px] rounded-xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center bg-muted/10">
                <ImageIcon className="w-10 h-10 text-muted-foreground/40 mb-3" />
                <p className="text-sm font-medium text-muted-foreground">
                  Sin evidencia fotográfica
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  El reporte fue enviado sin imagen
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}