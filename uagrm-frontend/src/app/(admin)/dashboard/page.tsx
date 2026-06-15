"use client";

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
} from "lucide-react";
import Link from "next/link";

// DATOS REALISTAS - Para escala actual
const stats = [
  {
    label: "Usuarios Activos",
    value: "24",
    change: "+3",
    trend: "up",
    icon: UserPlus,
    gradient: "from-blue-500/20 to-blue-600/5",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    description: "Usuarios registrados",
  },
  {
    label: "Reportes Totales",
    value: "8",
    change: "+2",
    trend: "up",
    icon: FileText,
    gradient: "from-purple-500/20 to-purple-600/5",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
    description: "En lo que va del mes",
  },
  {
    label: "Pendientes",
    value: "3",
    change: "-1",
    trend: "down",
    icon: Timer,
    gradient: "from-amber-500/20 to-amber-600/5",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    description: "Por atender",
  },
  {
    label: "Resueltos",
    value: "5",
    change: "+2",
    trend: "up",
    icon: CheckCheck,
    gradient: "from-emerald-500/20 to-emerald-600/5",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    description: "Completados",
  },
];

// Reportes recientes
const recentReports = [
  {
    id: "rep_001",
    type: "WASTE",
    status: "PENDING",
    desc: "Basura acumulada en pasillo principal del bloque B",
    location: "Bloque B - 2do piso",
    time: "Hace 10 min",
    userType: "ESTUDIANTE",
    icon: Trash2,
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-500",
  },
  {
    id: "rep_002",
    type: "LIGHTING",
    status: "IN_PROGRESS",
    desc: "Falla de luces en el estacionamiento norte",
    location: "Estacionamiento Norte",
    time: "Hace 25 min",
    userType: "DOCENTE",
    icon: Lightbulb,
    iconBg: "bg-yellow-500/15",
    iconColor: "text-yellow-500",
  },
  {
    id: "rep_003",
    type: "BATHROOM",
    status: "RESOLVED",
    desc: "Baño sin agua en pabellón de ingeniería",
    location: "Pabellón Ingeniería",
    time: "Hace 1 hora",
    userType: "ESTUDIANTE",
    icon: Bath,
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-500",
  },
];

const topAreas = [
  { area: "Bloque B", incidents: 3, trend: "up", icon: Building2 },
  { area: "Estacionamiento", incidents: 2, trend: "up", icon: MapPin },
  { area: "Pabellón Ingeniería", incidents: 2, trend: "down", icon: School },
  { area: "Biblioteca", incidents: 1, trend: "down", icon: School },
];

const recentActivity = [
  {
    id: 1,
    action: "Reporte #REP-003 resuelto",
    time: "Hace 1 hora",
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-500",
  },
  {
    id: 2,
    action: "Nuevo usuario registrado",
    time: "Hace 3 horas",
    icon: Users,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    action: "Reporte #REP-001 pendiente",
    time: "Hace 5 horas",
    icon: Clock,
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-500",
  },
  {
    id: 4,
    action: "Campaña de reciclaje iniciada",
    time: "Ayer",
    icon: Recycle,
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-500",
  },
];

const getStatusVariant = (status: string): "secondary" | "default" | "destructive" | "outline" => {
  switch (status) {
    case "PENDING":
      return "secondary";
    case "IN_PROGRESS":
      return "outline";
    case "RESOLVED":
      return "default";
    default:
      return "secondary";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "PENDING":
      return "Pendiente";
    case "IN_PROGRESS":
      return "En Progreso";
    case "RESOLVED":
      return "Resuelto";
    default:
      return status;
  }
};

const getIncidentLabel = (type: string) => {
  switch (type) {
    case "WASTE":
      return "Residuos";
    case "LIGHTING":
      return "Iluminación";
    case "BATHROOM":
      return "Sanitarios";
    case "FURNITURE":
      return "Mobiliario";
    default:
      return type;
  }
};

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
  const resolvedCount = stats.find(s => s.label === "Resueltos")?.value || "0";
  const totalCount = stats.find(s => s.label === "Reportes Totales")?.value || "0";
  const resolutionRate = Math.round((parseInt(resolvedCount) / parseInt(totalCount)) * 100) || 0;

  return (
    <div className="relative">
<div
  className="
    absolute inset-0 z-50
    backdrop-blur-[6px]
    bg-background/30
    flex items-start justify-center
    pt-60
  "
>
  <div
    className="
      rounded-2xl
      border border-border/50
      bg-background/80
      backdrop-blur-xl
      px-8 py-6
      shadow-2xl
      text-center
      max-w-md
    "
  >
<h2 className="text-2xl font-bold">
  🚧 Dashboard en construcción
</h2>

<p className="text-muted-foreground mt-2 text-sm">
  Estamos preparando las métricas y analíticas del sistema.
</p>
  </div>
</div>
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
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
            <Leaf className="w-4 h-4" />
            <span>¡Campus más limpio cada día!</span>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            Esta semana
          </Button>
          <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
            <FileText className="w-4 h-4" />
            Generar reporte
          </Button>
        </div>
      </div>

      {/* STATS CARDS - REDISEÑADAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className={`relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-to-br ${stat.gradient}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${stat.trend === "up" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`}>
                  {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
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
                  <Badge variant="secondary" className="text-xs">{recentReports.length} nuevos</Badge>
                </div>
                <Link href="/reports" className="text-sm text-primary hover:underline flex items-center gap-1">
                  Ver todos
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
            
            <div className="p-0">
              {recentReports.map((report, idx) => {
                const Icon = report.icon;
                return (
                  <div
                    key={report.id}
                    className={`
                      flex items-center justify-between p-5 transition-all hover:bg-muted/30
                      ${idx !== recentReports.length - 1 ? "border-b border-border/50" : ""}
                    `}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-xl ${report.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${report.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-foreground">
                            {getIncidentLabel(report.type)}
                          </span>
                          <Badge variant={getStatusVariant(report.status)} className="text-[10px]">
                            {getStatusLabel(report.status)}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {report.location}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          {report.desc}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                          <span>{report.time}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {report.userType}
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
              {topAreas.map((area) => {
                const AreaIcon = area.icon;
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
                    <ProgressBar value={area.incidents} max={5} />
                  </div>
                );
              })}
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
                {resolvedCount} de {totalCount} reportes resueltos
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
              {recentActivity.map((activity) => {
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
              })}
            </div>
          </Card>

          {/* LOGRO - Versión compacta */}
          <Card className="border-border/50 overflow-hidden">
            <div className="p-5 flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10">
                <Award className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Reconocimiento</p>
                <p className="text-sm font-semibold text-foreground">62% de meta mensual</p>
                <p className="text-xs text-muted-foreground">¡Vamos por más!</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 text-xs text-muted-foreground border-t border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Sistema operativo</span>
          <span>•</span>
          <span>Última actualización hace 2 minutos</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">🎯 Meta: 10 reportes/mes</span>
          <span className="flex items-center gap-1">🌱 +5 esta semana</span>
        </div>
      </div>
    </div>

    </div>
  );
}