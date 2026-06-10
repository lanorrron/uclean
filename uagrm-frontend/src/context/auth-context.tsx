"use client";

import { createContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import {supabase} from "@/lib/supabase/client";
import { Loader } from "@/@core/components/loader/Loader";

import {
  AppUser,
  AuthValues,
  LoginParams,
} from "./types";

import invitationService from "@/modules/user/services/invitation.service";

const defaultValueProvider: AuthValues = {
  user: null,
  profile: null,
  login: async () => ({ success: false }),
  logout: async () => {},
  isAuthenticated: false,
};

export const AuthContext =
  createContext<AuthValues>(defaultValueProvider);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    console.log("Loading profile...");
      console.log("Loading profile...");
    try {
      const {
        data: { session },error
      } = await supabase.auth.getSession(); 
      console.log("Session data:", session, "Error:", error);
        console.log("Session data:", session, "Error:", error);
        console.log("Session data:", session, "Error:", error);


      const currentUser = session?.user ?? null;

      if (!currentUser) {
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
        return;
      }

      const profile = await invitationService.me();

      setUser(currentUser);
      setProfile(profile);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);

      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();

    const { data: listener } =
      supabase.auth.onAuthStateChange(
        async (_, session) => {
          const currentUser = session?.user ?? null;

          if (!currentUser) {
            setUser(null);
            setProfile(null);
            setIsAuthenticated(false);
            return;
          }

          try {
            const profile = await invitationService.me();

            setUser(currentUser);
            setProfile(profile);
            setIsAuthenticated(true);
          } catch (error) {

            console.log(error);
          }
        }
      );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async ({
    email,
    password,
    captchaToken,
  }: LoginParams) => {
    const { error, data } =
      await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          captchaToken,
        },
      });

    if (error) {
      throw {
        success: false,
        message: error.message,
      };
    }

    const profile = await invitationService.me();

    setUser(data.user);
    setProfile(profile);
    setIsAuthenticated(true);

    router.push("/dashboard");
    router.refresh();

    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();

    setUser(null);
    setProfile(null);
    setIsAuthenticated(false);

    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader size="44px" />
      </div>
    );
  }

  const values: AuthValues = {
    user,
    profile,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};