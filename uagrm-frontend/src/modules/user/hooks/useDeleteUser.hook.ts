"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import userService from "@/modules/user/services/user.service";

export function useDeleteUser() {

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const deleteUser = async (
    id: string
  ) => {

    try {

      setLoading(true);

      setError(null);

      const response =
        await userService.remove(id);

      toast.success(
        "Usuario eliminado"
      );

      return response;

    } catch (err: any) {

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Error eliminando usuario";

      setError(message);

      toast.error(message);

      throw err;

    } finally {

      setLoading(false);
    }
  };

  return {
    deleteUser,
    loading,
    error,
  };
}
