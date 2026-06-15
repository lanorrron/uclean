"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  User,
  Lock,
  AlertCircle,
} from "lucide-react";

import { IoIosEyeOff } from "react-icons/io";
import { BiSolidShow } from "react-icons/bi";

import { Loader } from "@/@core/components/loader/Loader";

import invitationService from "@/modules/user/services/invitation.service";

import { useCompleteProfile }
from "@/modules/user/hooks/useCompleteProfile";

import { supabase }
from "@/lib/supabase/client";

type ProfileForm = {
  firstName: string;
  lastName: string;
  password: string;
};

// 🔥 NORMALIZAR NOMBRES
const normalizeName = (
  value: string
) => {

  return value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
};

export default function AcceptInvitePage() {

  const router = useRouter();

  const {
    completeProfile,
    loading: completingProfile,
  } = useCompleteProfile();

  const [needsProfile,
    setNeedsProfile] = useState(false);

  const [loading,
    setLoading] = useState(true);

  const [error,
    setError] =
    useState<string | null>(null);

  const [showPassword,
    setShowPassword] = useState(false);

  const togglePasswordVisibility =
    () =>
      setShowPassword(
        (prev) => !prev
      );

  // 🔥 REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileForm>();


  useEffect(() => {

    const handleInvite = async () => {

      try {

        setLoading(true);

        const hash =
          window.location.hash;

        let sessionSet = false;

        if (hash) {

          const params =
            new URLSearchParams(
              hash.replace("#", "")
            );

          const access_token =
            params.get("access_token");

          const refresh_token =
            params.get("refresh_token");

          if (
            access_token &&
            refresh_token
          ) {

            const { error } =
              await supabase.auth
                .setSession({
                  access_token,
                  refresh_token,
                });

            if (error) {
              throw error;
            }

            sessionSet = true;
          }
        }

        if (!sessionSet) {

          const { data } =
            await supabase.auth
              .getSession();

          if (!data.session) {

            throw new Error(
              "No se pudo obtener sesión de invitación"
            );
          }
        }

        await invitationService
          .accepInvitation();

        const { data } =
          await supabase.auth
            .getUser();

        const meta =
          data.user?.user_metadata ?? {};

        const hasProfile =
          Boolean(
            meta.firstName &&
            meta.lastName
          );

        if (!hasProfile) {

          setNeedsProfile(true);

        } else {

          window.location.replace(
            "/dashboard"
          );
        }

      } catch (err: any) {

        setError(
          err.message ||
          "Error aceptando invitación"
        );

      } finally {

        setLoading(false);
      }
    };

    handleInvite();

  }, [router]);


  const onSubmit = async (
    data: ProfileForm
  ) => {

    try {

      const payload = {

        firstName:
          normalizeName(
            data.firstName
          ),

        lastName:
          normalizeName(
            data.lastName
          ),

        password: data.password};

      await completeProfile( payload );
      console.log("Perfil completado:", payload);

      window.location.replace("/dashboard");

    } catch (err: any) {

      setError(err.message);
    }
  };

  if (loading && !needsProfile) {

    return (
      <div className="h-screen flex items-center justify-center">
        <Loader size="44px" />
      </div>
    );
  }

  if (error && !needsProfile) {

    return (
      <div className="h-screen flex items-center justify-center">

        <Card className="p-6 max-w-md text-center space-y-4">

          <p className="text-red-500 text-sm">
            {error}
          </p>

          <Button
            onClick={() =>
              router.push("/")
            }
          >
            Volver al inicio
          </Button>

        </Card>

      </div>
    );
  }

  if (needsProfile) {

    return (

      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          className="w-full max-w-md"
        >

          <Card className="rounded-3xl">

            <CardContent className="p-8 space-y-6">

              {/* HEADER */}
              <div className="flex flex-col items-center text-center gap-2">

                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>

                <h2 className="text-2xl font-semibold">
                  Completa tu perfil
                </h2>

                <p className="text-sm text-muted-foreground">
                  Necesitamos estos datos para continuar
                </p>

              </div>

              {/* FORM */}
              <form
                onSubmit={
                  handleSubmit(onSubmit)
                }
                className="space-y-4"
              >

                <div className="space-y-2">

                  <label className="text-sm font-medium text-foreground flex items-center gap-2">

                    <User className="h-4 w-4 text-muted-foreground" />

                    Nombre

                  </label>

                  <Input
                    placeholder="José Alfredo"
                    className="h-11 rounded-xl"
                    {...register(
                      "firstName",
                      {
                        required:
                          "El nombre es requerido",

                        minLength: {
                          value: 2,
                          message:
                            "Mínimo 2 caracteres",
                        },

                        validate:
                          (value) => {

                            const clean =
                              value.trim();

                            if (!clean) {

                              return "Nombre inválido";
                            }

                            return true;
                          },

                        onBlur: (
                          e
                        ) => {

                          setValue(
                            "firstName",

                            normalizeName(
                              e.target.value
                            )
                          );
                        },
                      }
                    )}
                  />

                  {errors.firstName && (

                    <p className="text-destructive text-xs flex items-center gap-1">

                      <AlertCircle className="h-3 w-3" />

                      {
                        errors.firstName
                          .message
                      }

                    </p>
                  )}
                </div>

                {/* APELLIDO */}
                <div className="space-y-2">

                  <label className="text-sm font-medium text-foreground flex items-center gap-2">

                    <User className="h-4 w-4 text-muted-foreground" />

                    Apellido

                  </label>

                  <Input
                    placeholder="Pérez Gómez"
                    className="h-11 rounded-xl"
                    {...register(
                      "lastName",
                      {
                        required:
                          "El apellido es requerido",

                        minLength: {
                          value: 2,
                          message:
                            "Mínimo 2 caracteres",
                        },

                        validate:
                          (value) => {

                            const clean =
                              value.trim();

                            if (!clean) {

                              return "Apellido inválido";
                            }

                            return true;
                          },

                        onBlur: (
                          e
                        ) => {

                          setValue(
                            "lastName",

                            normalizeName(
                              e.target.value
                            )
                          );
                        },
                      }
                    )}
                  />

                  {errors.lastName && (

                    <p className="text-destructive text-xs flex items-center gap-1">

                      <AlertCircle className="h-3 w-3" />

                      {
                        errors.lastName
                          .message
                      }

                    </p>
                  )}
                </div>

                <div className="space-y-2">

                  <label className="text-sm font-medium text-foreground flex items-center gap-2">

                    <Lock className="h-4 w-4 text-muted-foreground" />

                    Contraseña

                  </label>

                  <div className="relative">

                    <Input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="••••••••"
                      className="h-11 rounded-xl pr-12"
                      {...register(
                        "password",
                        {
                          required:
                            "La contraseña es requerida",

                          minLength: {
                            value: 8,
                            message:
                              "Mínimo 8 caracteres",
                          },

                          validate:
                            (value) => {

                              if (
                                !/[A-Z]/.test(
                                  value
                                )
                              ) {

                                return "Debe tener una mayúscula";
                              }

                              if (
                                !/[0-9]/.test(
                                  value
                                )
                              ) {

                                return "Debe tener un número";
                              }

                              return true;
                            },
                        }
                      )}
                    />

                    <button
                      type="button"
                      onClick={
                        togglePasswordVisibility
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >

                      {showPassword ? (

                        <IoIosEyeOff className="h-5 w-5" />

                      ) : (

                        <BiSolidShow className="h-5 w-5" />
                      )}
                    </button>

                  </div>

                  {errors.password && (

                    <p className="text-destructive text-xs flex items-center gap-1">

                      <AlertCircle className="h-3 w-3" />

                      {
                        errors.password
                          .message
                      }

                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl"
                  disabled={
                    completingProfile
                  }
                >
                  Continuar
                </Button>

              </form>

            </CardContent>

          </Card>

        </motion.div>

      </div>
    );
  }

  return null;
}
