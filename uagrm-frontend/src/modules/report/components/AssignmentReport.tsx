"use client";

import { UserX, UserCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Role, User } from "@/modules/user/types/user.type";
import AssignmentReportModal from "./AssignmentModal";


interface Props {
  assignedTo?: User | null;
  onAssign?: (worker: User) => void;
  onRemove?: () => void;
}

export default function AssignmentReport({
  assignedTo,
  onAssign,
  onRemove,
}: Props) {
  const isAssigned = !!assignedTo;


  const getInitials = (name?: string | null) => {
    if (!name) return "NA";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="p-5 rounded-xl shadow-sm border-l-4 border-l-primary bg-card">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="flex items-center gap-4 flex-1">

          {isAssigned && assignedTo ? (
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <span className="text-primary font-bold text-sm">
                {getInitials(assignedTo.first_name+ ' ' + assignedTo.last_name)}
              </span>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <UserX className="w-6 h-6 text-muted-foreground" />
            </div>
          )}

          <div>
            <h4 className="font-bold text-foreground">
              {isAssigned
                ? "Personal Asignado"
                : "Estado de Asignación"}
            </h4>

            {isAssigned && assignedTo ? (
              <div className="mt-0.5">
                <p className="font-medium text-foreground text-sm">
                  {assignedTo.last_name + ' ' + assignedTo.last_name}
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {assignedTo.role}
                  </Badge>

                  <span className="text-xs text-muted-foreground">
                    {assignedTo.email}
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

        <div className="flex gap-3">

          <AssignmentReportModal
            assigned={isAssigned}
            onAssign={onAssign}
          />

        </div>
      </div>
    </Card>
  );
}