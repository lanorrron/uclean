"use client";

import { useState } from "react";
import { UserX, UserCheck, Check, X, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Datos ficticios de trabajadores
const WORKERS = [
  { id: "1", name: "Carlos Rodríguez", role: "Supervisor de Limpieza", email: "carlos@uagrm.edu", area: "Mantenimiento" },
  { id: "2", name: "María Fernández", role: "Técnico de Mantenimiento", email: "maria@uagrm.edu", area: "Infraestructura" },
  { id: "3", name: "José Mamani", role: "Jardinero", email: "jose@uagrm.edu", area: "Áreas Verdes" },
  { id: "4", name: "Laura Paz", role: "Encargada de Baños", email: "laura@uagrm.edu", area: "Sanitarios" },
  { id: "5", name: "Roberto Sánchez", role: "Recolector de Residuos", email: "roberto@uagrm.edu", area: "Residuos Sólidos" },
  { id: "6", name: "Ana Quispe", role: "Supervisora General", email: "ana@uagrm.edu", area: "Coordinación" },
];

interface Worker {
  id: string;
  name: string;
  role: string;
  email: string;
  area: string;
}

interface Props {
  assignedTo?: Worker | null;
  onAssign?: (worker: Worker) => void;
  onRemove?: () => void;
}

export default function AssignmentReport({ assignedTo, onAssign, onRemove }: Props) {
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isAssigned = !!assignedTo;

  const handleAssign = () => {
    if (selectedWorker && onAssign) {
      onAssign(selectedWorker);
      setOpen(false);
      setSelectedWorker(null);
      setSearchTerm("");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredWorkers = WORKERS.filter((worker) =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-5 rounded-xl shadow-sm border-l-4 border-l-primary bg-card">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Información */}
        <div className="flex items-center gap-4 flex-1">
          {/* Avatar */}
          {isAssigned && assignedTo ? (
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <span className="text-primary font-bold text-sm">
                {getInitials(assignedTo.name)}
              </span>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <UserX className="w-6 h-6 text-muted-foreground" />
            </div>
          )}

          <div>
            <h4 className="font-bold text-foreground">
              {isAssigned ? "Personal Asignado" : "Estado de Asignación"}
            </h4>
            {isAssigned && assignedTo ? (
              <div className="mt-0.5">
                <p className="font-medium text-foreground text-sm">
                  {assignedTo.name}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {assignedTo.role}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {assignedTo.area}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Personal no asignado actualmente
              </p>
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          {isAssigned && (
            <Button
              variant="outline"
              onClick={onRemove}
              className="gap-2"
            >
              <UserX className="w-4 h-4" />
              Desasignar
            </Button>
          )}

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserCheck className="w-4 h-4" />
                {isAssigned ? "Reasignar" : "Asignar Personal"}
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-primary" />
                  Asignar Personal
                </DialogTitle>
                <DialogDescription>
                  Selecciona un trabajador para asignar a este reporte.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Búsqueda */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre, rol o área..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>

                {/* Lista de trabajadores */}
                <div className="max-h-[300px] overflow-y-auto space-y-2">
                  {filteredWorkers.map((worker) => (
                    <div
                      key={worker.id}
                      onClick={() => setSelectedWorker(worker)}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
                        ${selectedWorker?.id === worker.id
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-accent border border-transparent"
                        }
                      `}
                    >
                      {/* Avatar */}
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0
                        ${selectedWorker?.id === worker.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                        }
                      `}>
                        {getInitials(worker.name)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground">
                          {worker.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {worker.role}
                        </p>
                        <p className="text-[10px] text-muted-foreground/60">
                          {worker.area}
                        </p>
                      </div>

                      {selectedWorker?.id === worker.id && (
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      )}
                    </div>
                  ))}

                  {filteredWorkers.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No se encontraron trabajadores
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => {
                  setOpen(false);
                  setSelectedWorker(null);
                  setSearchTerm("");
                }}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleAssign}
                  disabled={!selectedWorker}
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Asignar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );
}