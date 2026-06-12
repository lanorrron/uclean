"use client";

import { useState } from "react";
import userService from "../services/user.service";

export function useRemoveUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const removeUser = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const result = await userService.remove(id);
            return result;
        } catch (err: any) {
            setError(err?.message || "Error al eliminar usuario");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        removeUser,
        loading,
        error,
    };
}