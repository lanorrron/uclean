"use client";

import { useState } from "react";

import {
  UserCheck,
  Check,
  X,
  Search,
} from "lucide-react";

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

import { Role, User } from "@/modules/user/types/user.type";
import { useUsers } from "@/modules/user/hooks/useUsers.hook";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  assigned?: boolean;
  onAssign?: (worker: User) => Promise<void> | void;
  loadingAssign?: boolean;
}

export default function AssignmentReportModal({
  assigned,
  onAssign,
  loadingAssign,
}: Props) {

  const { users, loading } = useUsers();
    const { profile} = useAuth();

  const [selectedWorker, setSelectedWorker] =
    useState<User | null>(null);

  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const submitAssign = async () => {
    if (!selectedWorker || !onAssign) return;

    await onAssign(selectedWorker);

    setOpen(false);
    setSelectedWorker(null);
    setSearchTerm("");
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "NA";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredWorkers = users.filter(
    (worker) =>
      worker.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" disabled={profile?.role !== Role.ADMIN}>
          <UserCheck className="w-4 h-4" />

          {assigned
            ? "Reasignar"
            : "Asignar Personal"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-primary" />
            Asignar Personal
          </DialogTitle>

          <DialogDescription>
            Selecciona un usuario del sistema.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

            <input
              type="text"
              placeholder="Buscar usuario..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm"
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          <div className="max-h-[300px] overflow-y-auto space-y-2">

            {loading && (
              <div className="text-center py-8 text-muted-foreground">
                Cargando usuarios...
              </div>
            )}

            {!loading &&
              filteredWorkers.map((worker) => (
                <div
                  key={worker.id}
                  onClick={() =>
                    setSelectedWorker(worker)
                  }
                  className={`
                    flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
                    ${
                      selectedWorker?.id === worker.id
                        ? "bg-primary/10 border border-primary/30"
                        : "hover:bg-accent border border-transparent"
                    }
                  `}
                >
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0
                      ${
                        selectedWorker?.id === worker.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }
                    `}
                  >
                    {getInitials(worker.name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">
                      {worker.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {worker.email}
                    </p>

                    <p className="text-[10px] text-muted-foreground/60">
                      {worker.role}
                    </p>
                  </div>

                  {selectedWorker?.id === worker.id && (
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </div>
              ))}

            {!loading &&
              filteredWorkers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No se encontraron usuarios
                </div>
              )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              setSelectedWorker(null);
              setSearchTerm("");
            }}
          >
            Cancelar
          </Button>

          <Button
            onClick={submitAssign}
            disabled={!selectedWorker || loadingAssign}
          >
            <UserCheck className="w-4 h-4 mr-2" />

            {loadingAssign
              ? "Asignando..."
              : "Asignar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}