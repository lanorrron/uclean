"use client";

import { useState } from "react";
import invitationService from "@/modules/user/services/invitation.service";

export function useCancelInvitation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelInvitation = async (invitationId: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await invitationService.cancelInvitation(invitationId);
      return result;
    } catch (err: any) {
      setError(err?.message || "Error al cancelar invitación");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    cancelInvitation,
    loading,
    error,
  };
}