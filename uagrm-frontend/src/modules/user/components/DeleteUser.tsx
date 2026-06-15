"use client";

import { useState } from "react";

import { Pencil, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useDeleteUser } from "../hooks/useDeleteUser.hook";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "../types/user.type";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";



interface Props {
  userId: string;
  onDeleted?: () => void;
}

export default function DeleteUser({
  userId,
  onDeleted,
}: Props) {

  const {
    deleteUser,
    loading,
  } = useDeleteUser();
  const { profile } = useAuth();

  const [open, setOpen] =
    useState(false);

  const handleDelete = async () => {

    try {

      await deleteUser(userId);

      onDeleted?.();

      setOpen(false);

    } catch { }
  };

  return (

    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <span>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            disabled={
              profile?.role !== Role.ADMIN ||
              userId === profile?.id
            }
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
      </span>
    </TooltipTrigger>

    <TooltipContent>
      {profile?.role !== Role.ADMIN
        ? "Solo administradores pueden eliminar"
        : userId === profile?.id
        ? "No puedes eliminarte a ti mismo"
        : "Eliminar usuario"}
    </TooltipContent>
  </Tooltip>
</TooltipProvider>


      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            ¿Eliminar usuario?
          </AlertDialogTitle>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="
              bg-red-500
              hover:bg-red-600
            "
          >
            {loading
              ? "Eliminando..."
              : "Eliminar"}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  );
}
