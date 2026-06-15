"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import userService from "@/modules/user/services/user.service";

import { Role }
    from "@/modules/user/types/user.type";

export function useUpdateRole() {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const updateRole = async (userId: string, role: Role) => {

        try {

            setLoading(true);

            setError(null);

            const response =
                await userService.updateRole(
                    userId,
                    role
                );

            toast.success(
                "Rol actualizado"
            );

            return response;

        } catch (err: any) {
console.log( err?.error.message )
            const message =
                err?.error.message ||
                err?.message ||
                "Error actualizando rol";

            setError(message);

            toast.error(message);

            throw err;

        } finally {

            setLoading(false);
        }
    };

    return {
        updateRole,
        loading,
        error,
    };
}