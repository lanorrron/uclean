"use client";

import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { User } from "../types/user.type";

interface Props {
  user: User;
  onUpdated?: () => void;
}

export default function UpdateUser({
  user,
  onUpdated,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Editar usuario
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input defaultValue={user.name ?? ""} />
          <Input defaultValue={user.email} />
        </div>

        <Button
          className="w-full"
          onClick={onUpdated}
        >
          Actualizar
        </Button>
      </DialogContent>
    </Dialog>
  );
}