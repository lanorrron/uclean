"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import userService from "@/modules/user/services/user.service";

import { supabase }
from "@/lib/supabase/client";

type CompleteProfileData = {
  firstName: string;
  lastName: string;
  password: string;
};

export function useCompleteProfile() {

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const completeProfile = async (
    data: CompleteProfileData
  ) => {

    try {
      setLoading(true);
      setError(null);
      const response =
        await userService.completeProfile({
          firstName: data.firstName,
          lastName: data.lastName,
        });

      const {
        error: passwordError,
      } =
        await supabase.auth.updateUser({
          password: data.password,
        });

      if (passwordError) {
        throw passwordError;
      }

      const {
        error: refreshError,
      } =
        await supabase.auth.refreshSession();

      if (refreshError) {
        throw refreshError;
      }

      return response;

    } catch (err: any) {

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Error completing profile";

      setError(message);

      toast.error(message);

      throw err;

    } finally {

      setLoading(false);
    }
  };

  return {
    completeProfile,
    loading,
    error,
  };
}
