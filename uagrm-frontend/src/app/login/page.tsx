"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BiSolidShow } from "react-icons/bi";
import { IoIosEyeOff } from "react-icons/io";
import { useContext, useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthContext } from "@/context/auth-context";
import { LoginParams } from "@/context/types";
import { Loader } from "@/@core/components/loader/Loader";
import { useSearchParams } from "next/navigation";
import { Mail, Lock, AlertCircle, ArrowRight, Shield, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Turnstile } from '@marsidev/react-turnstile'

interface ErrorType {
  success: boolean;
  message: string;
}

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const [captchaToken, setCaptchaToken] = useState('')
  const cloudflareSiteKey = process.env.NEXT_PUBLIC_SITE_KEY_CLOUDFLARE
  const searchParams = useSearchParams();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const rememberMe = watch("rememberMe");

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError({ success: false, message: "Error de autenticación. Por favor intenta de nuevo." });
    }
  }, [searchParams]);

  function togglePasswordVisibility(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    setShowPassword((prev) => !prev);
  }

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    setError(null);

    const params: LoginParams = { 
      email: data.email, 
      password: data.password, 
      captchaToken 
    }

    await login(params)
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo y branding */}
        <div className="text-center mb-8">
<h1 className="text-2xl font-bold bg-gradient-to-r from-primary from-50% to-secondary to-50% bg-clip-text text-transparent">
  EcoUAGRM
</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sistema de Gestión Ambiental Universitaria
          </p>
        </div>

        {/* Card principal */}
        <Card className="border-border bg-card rounded-2xl overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Bienvenido</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Campo Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Correo Electrónico
                </label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  {...register("email", {
                    required: "El email es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido"
                    }
                  })}
                  className="h-11 bg-background rounded-xl"
                />
                {errors.email && (
                  <p className="text-destructive text-xs flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Campo Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "La contraseña es requerida",
                      minLength: {
                        value: 8,
                        message: "Mínimo 8 caracteres"
                      }
                    })}
                    className="h-11 bg-background rounded-xl pr-12"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
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
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Turnstile */}
              <div className="flex justify-center py-2">
                <Turnstile
                  siteKey={cloudflareSiteKey ?? ""}
                  onSuccess={(token) => setCaptchaToken(token)}
                  options={{
                    theme: 'auto',
                    size: 'normal',
                  }}
                />
              </div>

              {/* Errores */}
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3">
                  <p className="text-destructive text-sm text-center font-medium flex items-center justify-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {error.message}
                  </p>
                </div>
              )}

              {/* Botón submit */}
              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg transition-all duration-300 group"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader color="text-primary-foreground" size="18px" />
                    <span>Ingresando...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Ingresar</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>

            {/* Footer con seguridad */}
            <div className="mt-6 pt-4 border-t border-border text-center">
              <p className="text-[11px] text-muted-foreground/60 flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" />
                Conexión segura • SSL/TLS encriptado
              </p>
            </div>
          </div>
        </Card>

        {/* Footer adicional */}
        <p className="text-center text-xs text-muted-foreground/50 mt-6">
          © 2024 EcoUAGRM • Universidad Gabriel René Moreno
        </p>
      </div>
    </div>
  );
};

export default Login;