"use client";

import { CalendarIcon, Filter, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { ReportQuery, ReportStatus } from "../type/report.type";

export type DatePreset = "today" | "7d" | "month" | "custom";

interface Props {
  value: ReportQuery;
  onChange: (query: ReportQuery) => void;
}

const getLast7Days = () => {
  const now = new Date();
  const from = new Date();
  from.setDate(now.getDate() - 7);
  return { from, to: now };
};

const PRESETS = [
  { key: "today", label: "Hoy" },
  { key: "7d", label: "7d" },
  { key: "month", label: "Mes" },
];

export default function ReportFilters({ value, onChange }: Props) {
  const [datePreset, setDatePreset] = useState<DatePreset>("7d");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(getLast7Days());

  const applyPreset = (preset: DatePreset): DateRange | undefined => {
    const now = new Date();
    switch (preset) {
      case "today":
        return {
          from: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          to: now,
        };
      case "7d":
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        return { from: sevenDaysAgo, to: now };
      case "month":
        return {
          from: new Date(now.getFullYear(), now.getMonth(), 1),
          to: now,
        };
      default:
        return dateRange;
    }
  };

  useEffect(() => {
    if (!dateRange?.from || !dateRange?.to) return;
    onChange({
      ...value,
      from: dateRange.from.toISOString(),
      to: dateRange.to.toISOString(),
    });
  }, [dateRange]);

  const handlePresetClick = (preset: DatePreset) => {
    setDatePreset(preset);
    const newRange = applyPreset(preset);
    setDateRange(newRange);
  };

  const hasActiveFilters = value.status !== undefined || value.from || value.to;

  return (
    <Card className="px-4 py-2.5 border-border/50 bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Lado izquierdo */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Título Filtros */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Filtros</span>
          </div>

          {/* Separador */}
          <div className="h-5 w-px bg-border/50" />

          {/* Presets fechas */}
          <div className="flex items-center bg-muted/30 rounded-md overflow-hidden border border-border/40">
            {PRESETS.map((item) => (
              <button
                key={item.key}
                onClick={() => handlePresetClick(item.key as DatePreset)}
                className={`
                  px-3 py-1.5 text-sm font-medium transition-all
                  ${datePreset === item.key
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Rango custom */}
<Popover>
  <PopoverTrigger asChild>
    <Button
      variant="ghost"
      size="default"
      className="h-8 gap-1 text-sm px-3 rounded-md hover:bg-muted hover:text-foreground transition-colors"
    >
      <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
      {dateRange?.from && dateRange?.to ? (
        <span className="text-sm text-foreground">
          {dateRange.from.toLocaleDateString("es-BO", { day: "2-digit", month: "short" })}
          {" - "}
          {dateRange.to.toLocaleDateString("es-BO", { day: "2-digit", month: "short" })}
        </span>
      ) : (
        <span className="text-sm text-muted-foreground">Seleccionar rango</span>
      )}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="range"
      selected={dateRange}
      onSelect={(range) => {
        setDateRange(range);
        if (range?.from && range?.to) setDatePreset("custom");
      }}
      numberOfMonths={2}
    />
  </PopoverContent>
</Popover>

          {/* Estado */}
          <Select
            value={value.status ?? "ALL"}
            onValueChange={(status) =>
              onChange({
                ...value,
                status: status === "ALL" ? undefined : status as ReportStatus,
              })
            }
          >
            <SelectTrigger className="h-8! w-[115px] text-sm px-3 border-border/40 rounded-md bg-background">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL" className="text-sm">Todos</SelectItem>
              <SelectItem value="PENDING" className="text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  Pendiente
                </span>
              </SelectItem>
              <SelectItem value="IN_PROGRESS" className="text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  En progreso
                </span>
              </SelectItem>
              <SelectItem value="RESOLVED" className="text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Resuelto
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lado derecho - Badge Activos + Limpiar */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
              {value.status && value.from ? "2 filtros activos" : 
               value.status || value.from ? "1 filtro activo" : "Activos"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDatePreset("7d");
                setDateRange(getLast7Days());
                onChange({});
              }}
              className="h-8 gap-1 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <X className="h-3.5 w-3.5" />
              Limpiar
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}