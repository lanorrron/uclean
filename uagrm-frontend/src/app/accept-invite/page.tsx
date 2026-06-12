"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

import { Loader } from "@/@core/components/loader/Loader";
import { useAuth } from "@/hooks/useAuth";

import invitationService from "@/modules/user/services/invitation.service";
import { supabase } from "@/lib/supabase/client";

type ProfileForm = {
  firstName: string;
  lastName: string;
};

export default function AcceptInvitePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [needsProfile, setNeedsProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ProfileForm>({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const handleInvite = async () => {
      try {
        setLoading(true);

        const hash = window.location.hash;

        let sessionSet = false;

        if (hash) {
          const params = new URLSearchParams(hash.replace("#", ""));
          const access_token = params.get("access_token");
          const refresh_token = params.get("refresh_token");

          if (access_token && refresh_token) {
            const { error } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });

            if (error) throw error;

            sessionSet = true;
          }
        }

        // 2️⃣ Fallback: sesión ya existente
        if (!sessionSet) {
          const { data } = await supabase.auth.getSession();

          if (!data.session) {
            throw new Error("No se pudo obtener sesión de invitación");
          }
        }

        // 3️⃣ Llamar backend para aceptar invitación
        await invitationService.accepInvitation();

        // 4️⃣ Verificar metadata de usuario
        const { data } = await supabase.auth.getUser();
        const meta = data.user?.user_metadata ?? {};

        const hasProfile = Boolean(meta.firstName && meta.lastName);

        if (!hasProfile) {
          setNeedsProfile(true);
        } else {
          router.replace("/dashboard");
        }
      } catch (err: any) {
        setError(err.message || "Error aceptando invitación");
      } finally {
        setLoading(false);
      }
    };

    handleInvite();
  }, [router]);

  // ================= PROFILE SUBMIT =================
  const onSubmit = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          full_name: `${form.firstName} ${form.lastName}`,
        },
      });

      if (error) throw error;

      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // ================= LOADING =================
  if (loading && !needsProfile) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader size="44px" />
      </div>
    );
  }

  // ================= ERROR =================
  if (error && !needsProfile) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Card className="p-6 max-w-md text-center space-y-4">
          <p className="text-red-500 text-sm">{error}</p>

          <Button onClick={() => router.push("/")}>
            Volver al inicio
          </Button>
        </Card>
      </div>
    );
  }

  // ================= PROFILE FORM =================
  if (needsProfile) {
    return (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="rounded-3xl">
            <CardContent className="p-8 space-y-6">

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

              <div className="space-y-3">
                <Input
                  placeholder="Nombre"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />

                <Input
                  placeholder="Apellido"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </div>

              <Button onClick={onSubmit} className="w-full">
                Continuar
              </Button>

            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return null;
}