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
import { FcGoogle } from "react-icons/fc";
import createClient from "@/lib/supabase/client";
import { useSearchParams, useRouter } from "next/navigation";
import { LoaderCircle, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
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
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [oauthError, setOauthError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState('')
  const cloudflareSiteKey = process.env.NEXT_PUBLIC_SITE_KEY_CLOUDFLARE

  const supabase = createClient();
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
    const error = searchParams.get('error');
    if (error) {
      switch (error) {
        case 'oauth_access_denied':
          setOauthError('You denied access to your Google account.');
          break;
        case 'no_code':
          setOauthError('Authentication failed. No authorization code received.');
          break;
        case 'auth_failed':
          setOauthError('Authentication failed. Please try again.');
          break;
        case 'user_not_found':
          setOauthError('User not found. Please try again.');
          break;
        default:
          setOauthError('An unexpected error occurred. Please try again.');
      }
    }
  }, [searchParams]);

  const loginWithGoogle = async () => {
    setIsGoogleLoading(true);
    setOauthError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setOauthError("There was an error logging in with Google. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  function togglePasswordVisibility(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    setShowPassword((prev) => !prev);
  }

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    setError(null);
    setOauthError(null);

    const params: LoginParams = { email: data.email, password: data.password, captchaToken }

    await login(params)
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-primary/5 p-6">
      <div className="w-full max-w-md">



        {/* Card más ancha y sin borde */}
        <Card className="p-10 border-0 bg-card shadow-2xl shadow-primary/10 rounded-3xl"> {/* Cambios aquí */}
          <div className="text-center mb-4">
            <div className="relative w-full flex flex-col items-center ">

              <h2 className="relative text-3xl font-bold bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent">
                UAGRM Limpio
              </h2>
            </div>
            <h2 className="text-3xl font-bold text-foreground tracking-wide mb-2">Welcome back</h2>
            <p className="text-muted-foreground">
              Please enter your details to sign in
            </p>
          </div>

          <div className="space-y-7">

            {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className="h-12 border-border/40 focus:border-ring bg-background/80 rounded-xl transition-all duration-200 text-base"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters"
                        }
                      })

                      }
                      className="h-12 border-border/40 focus:border-ring bg-background/80 rounded-xl transition-all duration-200 text-base pr-12"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent/50"
                    >
                      {showPassword ? (
                        <IoIosEyeOff className="h-5 w-5" />
                      ) : (
                        <BiSolidShow className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-sm">{errors.password.message}</p>
                  )}
                </div>
              </div>

              {/* Errores */}
              {(error || oauthError) && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-2 animate-in fade-in">
                  <p className="text-destructive text-sm text-center font-medium">
                    {error?.message || oauthError}
                  </p>
                </div>
              )}

              {/* Options */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={rememberMe}
                    onCheckedChange={(checked:any) => setValue("rememberMe", checked as boolean)}
                    className="border-border/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary h-5 w-5 transition-colors "
                  />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">Remember me</span>
                </label>
                <a href="/forgot-password" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Forgot password?
                </a>
              </div>
              <div
                className="w-full flex justify-center"
                style={{
                  transform: 'scale(1.215',
                  transformOrigin: 'center center',
                  margin: '10px 0',

                }}
              >
                <Turnstile
                  siteKey={cloudflareSiteKey ?? ""}
                  onSuccess={(token) => {
                    setCaptchaToken(token)
                  }}
                />
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-primary/25 rounded-xl group"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-3">
                    <Loader color="text-primary-foreground" size="18px" />
                    <span className="text-base">Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <span className="text-base">Sign in</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                )}
              </Button>
            </form>
          </div>
        </Card>

        {/* Security notice */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground/70">
            🔒 End-to-end encrypted • Bank-level security
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;