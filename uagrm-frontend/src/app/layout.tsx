import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";

import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/auth-context";
import { SettingsProvider } from "@/context/settings-provider";
import { Toaster } from "react-hot-toast";

const fontMui = {
  variable: "--font-mui",
};

export const metadata: Metadata = {
  title: {
    default: "Kravax - Pasarela de Pagos Crypto",
    template: "%s | Kravax"
  },
  description: "Pasarela crypto para pagos seguros y rápidos. Acepta USDT, USDC y otras criptomonedas en tu negocio.",
  keywords: [
    "pasarela crypto",
    "pagos con criptomonedas",
    "bitcoin payments",
    "ethereum",
    "blockchain payments",
    "crypto gateway",
    "Kravax"
  ],
  authors: [{ name: "Kravax" }],
  creator: "Kravax",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
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
          {" "}
          <SettingsProvider>
            <AuthProvider>{children}</AuthProvider>
          </SettingsProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
