"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Bath,
  Lightbulb,
  Wrench,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  Bell,
  ArrowRight,
  Building2,
  Recycle,
  Sparkles,
  Activity,
  Zap,
  Leaf,
  School,
  Award,
  Percent,
  CheckCheck,
  UserPlus,
  Timer,
  Calendar as CalendarIcon,
} from "lucide-react";
import Link from "next/link";
import { useMetrics } from "@/modules/report/hooks/useMetrics.hook";
import { UserType } from "@/modules/user/types/user.type";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { IncidentType, MetricsReportResponse, ReportStatus } from "@/modules/report/type/report.type";
import { format } from "date-fns";
import { da, es } from "date-fns/locale";
import { GenerateReport } from "@/modules/report/components/GenerateReport";

// Barra de progreso
const ProgressBar = ({ value, max = 100 }: { value: number; max?: number }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default function DashboardPage() {
  // Estado para el rango de fechas
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidRange =
    dateRange?.from &&
    dateRange?.to &&
    dateRange.from.getTime() !== dateRange.to.getTime();

  const fromDate = isValidRange ? dateRange.from : undefined;
  const toDate = isValidRange ? dateRange.to : undefined;

  // Llamar al hook que automáticamente hará la petición cuando from/to cambien
  const { data, loading, error } = useMetrics(fromDate, toDate);


  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  // Mapeo de iconos por tipo de incidente
  const getIncidentIcon = (type: IncidentType | string) => {
    const typeStr = typeof type === 'string' ? type : type;

    switch (typeStr) {
      case IncidentType.WASTE:
      case 'WASTE':
        return Trash2;
      case IncidentType.LIGHTING:
      case 'LIGHTING':
        return Lightbulb;
      case IncidentType.BATHROOM:
      case 'BATHROOM':
        return Bath;
      case IncidentType.FURNITURE:
      case 'FURNITURE':
        return Wrench;
      case IncidentType.SECURITY:
      case 'SECURITY':
        return AlertTriangle;
      default:
        return FileText;
    }
  };

  // Colores por tipo de incidente
  const getIncidentColors = (type: IncidentType | string) => {
    const typeStr = typeof type === 'string' ? type : type;

    switch (typeStr) {
      case IncidentType.WASTE:
      case 'WASTE':
        return { bg: "bg-amber-500/15", color: "text-amber-500" };
      case IncidentType.LIGHTING:
      case 'LIGHTING':
        return { bg: "bg-yellow-500/15", color: "text-yellow-500" };
      case IncidentType.BATHROOM:
      case 'BATHROOM':
        return { bg: "bg-cyan-500/15", color: "text-cyan-500" };
      case IncidentType.FURNITURE:
      case 'FURNITURE':
        return { bg: "bg-orange-500/15", color: "text-orange-500" };
      case IncidentType.SECURITY:
      case 'SECURITY':
        return { bg: "bg-red-500/15", color: "text-red-500" };
      default:
        return { bg: "bg-gray-500/15", color: "text-gray-500" };
    }
  };

  const getStatusVariant = (
    status: ReportStatus
  ): "secondary" | "default" | "destructive" | "outline" => {
    switch (status) {
      case ReportStatus.PENDING:
        return "secondary";
      case ReportStatus.IN_PROGRESS:
        return "outline";
      case ReportStatus.RESOLVED:
        return "default";
      case ReportStatus.REJECTED:
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.PENDING:
        return "Pendiente";
      case ReportStatus.IN_PROGRESS:
        return "En Progreso";
      case ReportStatus.RESOLVED:
        return "Resuelto";
      case ReportStatus.REJECTED:
        return "Rechazado";
      default:
        return status;
    }
  };

  const getIncidentLabel = (type: IncidentType | string) => {
    const typeStr = typeof type === 'string' ? type : type;

    const typeMap: Record<string, string> = {
      'WASTE': "Residuos",
      'LIGHTING': "Iluminación",
      'BATHROOM': "Sanitarios",
      'FURNITURE': "Mobiliario",
      'SECURITY': "Seguridad"
    };

    const label = typeMap[typeStr];

    if (!label) {
      return "Sin tipo";
    }

    return label;
  };

  const getUserTypeLabel = (userType: UserType) => {
    switch (userType) {
      case UserType.STUDENT:
        return "Estudiante";
      case UserType.TEACHER:
        return "Docente";
      case UserType.VISITOR:
        return "Visitante";
      default:
        return userType;
    }
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    if (!range?.from) {
      setDateRange(undefined);
      return;
    }

    // Solo actualiza estado
    setDateRange(range);

    const isComplete =
      range.from &&
      range.to &&
      range.from.getTime() !== range.to.getTime();

    // cerrar SOLO cuando el rango está completo
    if (isComplete) {
      setIsPopoverOpen(false);
    }
  };

  // Función para limpiar el filtro de fechas
  const clearDateFilter = () => {
    setDateRange(undefined);
    setIsPopoverOpen(false);
  };

  // Preparar estadísticas con datos reales
  const stats = data ? [
    {
      label: "Usuarios Activos",
      value: data.totalUsers.toString(),
      icon: UserPlus,
      gradient: "from-blue-500/20 to-blue-600/5",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
      description: "Usuarios registrados",
    },
    {
      label: "Reportes Totales",
      value: data.totalReports.toString(),
      icon: FileText,
      gradient: "from-purple-500/20 to-purple-600/5",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
      description: dateRange?.from && dateRange?.to
        ? `${format(dateRange.from, "d MMM", { locale: es })} - ${format(dateRange.to, "d MMM", { locale: es })}`
        : "Todos los periodos",
    },
    {
      label: "Pendientes",
      value: data.pendingReports.toString(),
      icon: Timer,
      gradient: "from-amber-500/20 to-amber-600/5",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-500",
      description: "Por atender",
    },
    {
      label: "Resueltos",
      value: data.resolvedReports.toString(),
      icon: CheckCheck,
      gradient: "from-emerald-500/20 to-emerald-600/5",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
      description: "Completados",
    },
  ] : [];

  const resolutionRate = data?.resolutionRate ?? 0;
  const totalReports = data?.totalReports ?? 0;
  const resolvedReports = data?.resolvedReports ?? 0;

  // Preparar áreas con mayor incidencia
  const topAreas = data?.incidentsByArea
    ?.sort((a, b) => b.total - a.total)
    .slice(0, 4)
    .map((area, index) => ({
      area: area.area.replace(/_/g, " "),
      incidents: area.total,
      trend: index < 2 ? "up" : "down",
      icon: index === 0 ? Building2 : index === 1 ? MapPin : School,
    })) || [];

  // Preparar actividad reciente
  const recentActivity = data?.recentReports.slice(0, 4).map((report, index) => {
    const incidentType = report.incident_type as IncidentType;
    const Icon = getIncidentIcon(incidentType);
    const colors = getIncidentColors(incidentType);
    const incidentLabel = getIncidentLabel(incidentType);

    const actionMessages = {
      [ReportStatus.PENDING]: `Nuevo reporte de ${incidentLabel} pendiente`,
      [ReportStatus.IN_PROGRESS]: `Atendiendo reporte de ${incidentLabel}`,
      [ReportStatus.RESOLVED]: `Reporte de ${incidentLabel} resuelto`,
      [ReportStatus.REJECTED]: `Reporte de ${incidentLabel} rechazado`,
    };

    const action = actionMessages[report.status as ReportStatus] || `Reporte de ${incidentLabel}`;

    const timeAgo = Math.floor((Date.now() - new Date(report.created_at).getTime()) / 60000);
    const timeText = timeAgo < 1 ? "Hace un momento" :
      timeAgo < 60 ? `Hace ${timeAgo} min` :
        timeAgo < 1440 ? `Hace ${Math.floor(timeAgo / 60)} horas` :
          `Hace ${Math.floor(timeAgo / 1440)} días`;

    return {
      id: index + 1,
      action: action,
      time: timeText,
      icon: Icon,
      iconBg: colors.bg,
      iconColor: colors.color,
    };
  }) || [];

  // Mostrar loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  // Mostrar error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-destructive" />
          <h2 className="text-xl font-semibold">Error al cargar el dashboard</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Campus Limpio UAGRM
              </span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Resumen general del sistema de gestión de reportes
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* SELECTOR DE FECHAS MEJORADO - CON CIERRE AUTOMÁTICO */}
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`
                    h-9 gap-2 px-4 text-sm rounded-md transition-all shadow-sm hover:shadow
                    ${dateRange?.from && dateRange?.to
                      ? 'border-primary/50 bg-primary/5 hover:bg-primary/10'
                      : 'border-border/50 bg-background hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  <CalendarIcon className={`h-4 w-4 ${dateRange?.from && dateRange?.to ? 'text-primary' : 'text-muted-foreground'}`} />
                  {dateRange?.from && dateRange?.to ? (
                    <span className="text-sm font-medium text-foreground">
                      {format(dateRange.from, "d MMM", { locale: es })}
                      {" — "}
                      {format(dateRange.to, "d MMM", { locale: es })}
                    </span>
                  ) : dateRange?.from && !dateRange?.to ? (
                    <span className="text-sm text-muted-foreground">
                      {format(dateRange.from, "d MMM", { locale: es })} — selecciona fin
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Todos los periodos</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 border-border/50 shadow-lg"
                align="start"
              >
                <div className="p-3 border-b border-border/50 flex items-center justify-between">
                  <span className="text-sm font-medium">Seleccionar rango</span>
                  <div className="flex items-center gap-2">
                    {dateRange?.from && dateRange?.to && (
                      <Badge variant="secondary" className="text-[10px]">
                        Rango seleccionado
                      </Badge>
                    )}
                    {dateRange?.from && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={clearDateFilter}
                      >
                        Limpiar
                      </Button>
                    )}
                  </div>
                </div>
                <CalendarComponent
                  mode="range"
                  selected={dateRange}
                  onSelect={handleRangeSelect}
                  numberOfMonths={2}
                  className="rounded-md border-0"
                />
                {/* Indicador de selección */}
                {dateRange?.from && !dateRange?.to && (
                  <div className="p-3 border-t border-border/50 bg-muted/30">
                    <p className="text-xs text-muted-foreground text-center">
                      Selecciona la fecha final para completar el rango
                    </p>
                  </div>
                )}
              </PopoverContent>
            </Popover>
  <GenerateReport 
    data={data as MetricsReportResponse} 
    dateRange={dateRange}
    disabled={!data || loading}
  />
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className={`relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-to-br ${stat.gradient}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  {dateRange?.from && dateRange?.to && stat.label === "Reportes Totales" && (
                    <Badge variant="outline" className="text-[10px] border-primary/30">
                      Filtrado
                    </Badge>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm font-medium text-foreground mt-1">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* REPORTES RECIENTES */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden border-border/50">
              <div className="p-5 pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-foreground">Reportes Recientes</h2>
                    <Badge variant="secondary" className="text-xs">
                      {data?.recentReports.length || 0} nuevos
                    </Badge>
                  </div>
                  <Link href="/reports" className="text-sm text-primary hover:underline flex items-center gap-1">
                    Ver todos
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="p-0">
                {data?.recentReports.map((report, idx) => {
                  const Icon = getIncidentIcon(report.incident_type);
                  const colors = getIncidentColors(report.incident_type);
                  const timeAgo = Math.floor((Date.now() - new Date(report.created_at).getTime()) / 60000);
                  const timeText = timeAgo < 1 ? "Hace un momento" :
                    timeAgo < 60 ? `Hace ${timeAgo} min` :
                      timeAgo < 1440 ? `Hace ${Math.floor(timeAgo / 60)} horas` :
                        `Hace ${Math.floor(timeAgo / 1440)} días`;

                  return (
                    <div
                      key={report.id}
                      className={`
                        flex items-center justify-between p-5 transition-all hover:bg-muted/30
                        ${idx !== (data?.recentReports.length || 0) - 1 ? "border-b border-border/50" : ""}
                      `}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${colors.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-foreground">
                              {getIncidentLabel(report.incident_type)}
                            </span>
                            <Badge variant={getStatusVariant(report.status)} className="text-[10px]">
                              {getStatusLabel(report.status)}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {report.area.replace(/_/g, " ")}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                            {report.description || "Sin descripción"}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                            <span>{timeText}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {getUserTypeLabel(report.user_type)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="flex-shrink-0">
                        Ver
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* ÁREAS CON INCIDENCIA */}
            <Card className="border-border/50">
              <div className="p-5 pb-0">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Áreas con mayor incidencia</h2>
                </div>
              </div>
              <div className="p-5 pt-3 space-y-4">
                {topAreas.length > 0 ? (
                  topAreas.map((area) => {
                    const AreaIcon = area.icon;
                    const maxIncidents = Math.max(...topAreas.map(a => a.incidents), 1);
                    return (
                      <div key={area.area} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <AreaIcon className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">{area.area}</span>
                            {area.trend === "up" ? (
                              <TrendingUp className="w-3.5 h-3.5 text-red-500" />
                            ) : (
                              <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />
                            )}
                          </div>
                          <span className="text-muted-foreground">{area.incidents} incidente{area.incidents !== 1 ? "s" : ""}</span>
                        </div>
                        <ProgressBar value={area.incidents} max={maxIncidents} />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No hay datos de áreas disponibles
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* SIDEBAR DERECHO */}
          <div className="space-y-6">
            {/* TASA DE RESOLUCIÓN */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="p-6 text-center">
                <div className="inline-flex p-3 rounded-full bg-primary/20 mb-4">
                  <Percent className="w-6 h-6 text-primary" />
                </div>
                <p className="text-4xl font-bold text-foreground">{resolutionRate}%</p>
                <p className="text-sm font-medium text-foreground mt-1">Tasa de resolución</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {resolvedReports} de {totalReports} reportes resueltos
                </p>
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+20% vs mes pasado</span>
                </div>
              </div>
            </Card>

            {/* ACTIVIDAD RECIENTE */}
            <Card className="border-border/50">
              <div className="p-5 pb-0">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Actividad Reciente</h2>
                </div>
              </div>
              <div className="p-5 space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => {
                    const ActivityIcon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full ${activity.iconBg} flex items-center justify-center flex-shrink-0`}>
                          <ActivityIcon className={`w-4 h-4 ${activity.iconColor}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No hay actividad reciente
                  </p>
                )}
              </div>
            </Card>

            {/* LOGRO */}
            <Card className="border-border/50 overflow-hidden">
              <div className="p-5 flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-amber-500/10">
                  <Award className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reconocimiento</p>
                  <p className="text-sm font-semibold text-foreground">
                    {resolutionRate >= 70 ? "Excelente desempeño" : resolutionRate >= 40 ? "Buen progreso" : "¡A seguir mejorando!"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {resolutionRate >= 70 ? "¡Sigue así!" : resolutionRate >= 40 ? "Vamos por más" : "¡Cada reporte cuenta!"}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4 text-xs text-muted-foreground border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sistema operativo</span>
            <span>•</span>
            <span>Última actualización {new Date().toLocaleTimeString()}</span>
          </div>
          {dateRange?.from && dateRange?.to && (
            <span className="text-primary/70">
              • Mostrando datos del {format(dateRange.from, "dd/MM/yyyy")} al {format(dateRange.to, "dd/MM/yyyy")}
            </span>
          )}
          {dateRange?.from && !dateRange?.to && (
            <span className="text-amber-500/70">
              • Seleccionando fecha de inicio...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}