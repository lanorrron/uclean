"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle, Loader2, Clock, FileText, UserCheck, Wrench, CheckSquare } from "lucide-react";

interface TimelineItem {
  title: string;
  completed?: boolean;
  active?: boolean;
}

interface Props {
  items: TimelineItem[];
}

const getIcon = (title: string, completed: boolean, active: boolean) => {
  const iconClass = `w-3 h-3 ${active ? "text-primary-foreground" : completed ? "text-green-500" : "text-muted-foreground"}`;
  
  switch (title.toLowerCase()) {
    case "reportado":
      return <FileText className={iconClass} />;
    case "asignado":
      return <UserCheck className={iconClass} />;
    case "progreso":
    case "en progreso":
      return <Wrench className={iconClass} />;
    case "resuelto":
      return <CheckSquare className={iconClass} />;
    default:
      return <Clock className={iconClass} />;
  }
};

export default function ReportTimeline({ items }: Props) {
  return (
    <Card className="border-border/50 shadow-sm overflow-hidden">
      <CardContent className="p-2.5">
        {/* Título compacto - una sola línea */}
        <div className="flex items-center justify-center gap-1.5 mb-1.5">
          <Clock className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-semibold text-foreground uppercase tracking-wider">
            Línea de tiempo
          </span>
        </div>

        <div className="relative">
          {/* Línea horizontal */}
          <div className="absolute top-3 left-0 right-0 h-[2px] bg-border/60" />

          <div className="relative flex justify-between">
            {items.map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-0.5 flex-1">
                {/* Icono circular */}
                <div
                  className={`
                    relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-2 bg-background transition-all
                    ${
                      item.active
                        ? "border-primary bg-primary shadow-sm"
                        : item.completed
                        ? "border-green-500 bg-green-500/10"
                        : "border-border bg-background"
                    }
                  `}
                >
                  {item.active ? (
                    <Loader2 className="w-3 h-3 text-primary-foreground animate-spin" />
                  ) : item.completed ? (
                    getIcon(item.title, true, false)
                  ) : (
                    getIcon(item.title, false, false)
                  )}
                </div>

                {/* Título */}
                <span
                  className={`
                    text-[9px] font-medium text-center leading-tight
                    ${
                      item.active
                        ? "text-primary"
                        : item.completed
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  `}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}