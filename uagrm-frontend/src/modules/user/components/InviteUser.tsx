"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSendInvitation } from "../hooks/useInviteUser";
import { Role } from "../types/user.type";



interface Props {
  onCreated?: () => void;
}

export default function CreateUser({ onCreated }: Props) {
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role | "">("");

  const [localError, setLocalError] = useState<string | null>(null);

  const { sendInvitation, loading, error } = useSendInvitation();

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const resetForm = () => {
    setEmail("");
    setRole("");
    setLocalError(null);
  };

  const handleSubmit = async () => {
    const cleanEmail = email.trim();

    // 🔴 validaciones
    if (!cleanEmail) {
      setLocalError("El email es obligatorio");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setLocalError("Email no válido");
      return;
    }

    if (!role) {
      setLocalError("Debes seleccionar un rol");
      return;
    }

    try {
      setLocalError(null);

      await sendInvitation(cleanEmail, role as Role);

      resetForm();
      setOpen(false);
      onCreated?.();
    } catch (e) {
      // error viene del hook
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Invitar usuario
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invitar usuario</DialogTitle>
        </DialogHeader>

       <div className="space-y-3">
  {/* EMAIL */}
  <Input
    placeholder="Correo"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="h-11"
  />

  {/* ROLE SELECT */}
  <Select value={role} onValueChange={(value) => setRole(value as Role)}>
    <SelectTrigger className="h-11! w-full">
      <SelectValue placeholder="Selecciona un rol" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value={Role.ADMIN}>Admin</SelectItem>
      <SelectItem value={Role.AGENT}>Agente</SelectItem>
      <SelectItem value={Role.MODERATOR}>Moderador</SelectItem>
    </SelectContent>
  </Select>

  {/* ERROR */}
  {(localError || error) && (
    <p className="text-sm text-red-500">
      {localError || error}
    </p>
  )}
</div>

        <Button
          className="w-full"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Enviando..." : "Enviar invitación"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}