"use client";

import { createContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";
import { Loader } from "@/@core/components/loader/Loader";

import {
  AppUser,
  AuthValues,
  LoginParams,
} from "./types";
import userService from "@/modules/user/services/user.service";


const defaultValueProvider: AuthValues = {
  user: null,
  profile: null,
  login: async () => ({ success: false }),
  logout: async () => { },
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
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const currentUser = session?.user ?? null;


      if (!currentUser) {
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
        return;
      }

      setUser(currentUser);
      setIsAuthenticated(true);

      try {
        const profile = await userService.me();
        setProfile(profile);
      } catch (e) {

      }

    } catch (e) {


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
        async (event, session) => {

          const currentUser = session?.user ?? null;

          if (!currentUser) {
            setUser(null);
            setProfile(null);
            setIsAuthenticated(false);
            return;
          }

          setUser(currentUser);
          setIsAuthenticated(true);
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

    setUser(data.user);
    setIsAuthenticated(true);

    try {
      const profile = await userService.me();
      setProfile(profile);
    } catch (e) {
      console.log(e);
    }

    router.push("/reports");
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

  // ⏳ LOADING
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader size="44px" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};