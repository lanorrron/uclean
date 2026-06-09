import { User } from "@supabase/supabase-js";

export type LoginParams = {
  email: string;
  password: string;
  captchaToken: string;
};

export type AppUser = {
  id: string;
  email: string;
  role: string;
};

export type AuthValues = {
  user: User | null;
  profile: AppUser | null;
  login: (
    params: LoginParams
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};