"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { Role, User }
from "../types/user.type";

import { useAuth }
from "@/hooks/useAuth";

import { rolesArray } from "@/shared/utils";
import { useUpdateRole } from "../hooks/useUpdateRole";


interface Props {
  user: User;
  onUpdated?: () => void;
}

export default function UpdateUser({
  user,
  onUpdated,
}: Props) {

  const { profile } = useAuth();

  const {
    updateRole,
    loading,
  } = useUpdateRole();

  const [open, setOpen] =
    useState(false);

  const [role, setRole] =
    useState<Role>(user.role as Role);

  const handleUpdate = async () => {

    try {

      await updateRole(user.id, role);

      onUpdated?.();

      setOpen(false);

    } catch {}

  };

  return (

    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <TooltipProvider>

        <Tooltip>

          <TooltipTrigger asChild>

            <span>

              <DialogTrigger asChild>

                <Button
                  variant="outline"
                  size="icon"
                  disabled={
                    profile?.role !== Role.ADMIN ||
                    user.id === profile?.id
                  }
                >
                  <Pencil className="w-4 h-4" />
                </Button>

              </DialogTrigger>

            </span>

          </TooltipTrigger>

          <TooltipContent>

            {profile?.role !== Role.ADMIN
              ? "Solo administradores pueden editar"
              : user.id === profile?.id
              ? "No puedes editarte a ti mismo"
              : "Editar usuario"}

          </TooltipContent>

        </Tooltip>

      </TooltipProvider>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Editar usuario
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <Select
            value={role}
            onValueChange={(value) =>
              setRole(value as Role)
            }
          >

            <SelectTrigger className="w-full">

              <SelectValue placeholder="Selecciona un rol" />

            </SelectTrigger>

            <SelectContent>

              {rolesArray.map((roleItem) => (

                <SelectItem
                  key={roleItem.value}
                  value={roleItem.value}
                >
                  {roleItem.label}
                </SelectItem>

              ))}

            </SelectContent>

          </Select>

          <Button
            className="w-full"
            onClick={handleUpdate}
            disabled={loading}
          >

            {loading
              ? "Actualizando..."
              : "Actualizar"}

          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}