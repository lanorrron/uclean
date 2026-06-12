"use client";

import { useState } from "react";
import invitationService from "../services/invitation.service";
import { Role } from "../types/user.type";

export function useSendInvitation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendInvitation = async (email: string, role: Role) => {
        setLoading(true);
        setError(null);

        try {
            const result = await invitationService.sendInvitation(email, role);
            return result;
        } catch (err: any) {
            setError(err?.message || "Error al enviar invitación");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        sendInvitation,
        loading,
        error,
    };
}