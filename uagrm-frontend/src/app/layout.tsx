import type { Metadata } from "next";

// @ts-ignore: CSS import handled by Next.js app router
import "./globals.css";

import { Toaster } from "react-hot-toast";

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/context/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { SettingsProvider } from "@/context/settings-provider";

const fontMui = {
  variable: "--font-mui",
};

export const metadata: Metadata = {
  title: {
    default: "EcoUAGRM - Reportes Ambientales",
    template: "%s | EcoUAGRM",
  },

  description:
    "Sistema de reportes ambientales y mantenimiento para la UAGRM. Gestiona incidentes, residuos, iluminación, baños y más.",

  keywords: [
    "EcoUAGRM",
    "UAGRM",
    "reportes ambientales",
    "incidentes universitarios",
    "residuos sólidos",
    "mantenimiento",
    "campus universitario",
    "reportes ecológicos",
    "universidad",
    "sistema de reportes",
  ],

  authors: [
    {
      name: "EcoUAGRM",
    },
  ],

  creator: "EcoUAGRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontMui.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </SettingsProvider>
        </ThemeProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
          }}
        />
      </body>
    </html>
  );
}