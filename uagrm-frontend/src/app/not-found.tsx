// app/not-found.tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, Satellite } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-primary/5 p-6">
      <div className="w-full max-w-md">
        <Card className="p-10 border-0 bg-card shadow-2xl shadow-primary/10 rounded-3xl text-center">
          {/* Icono animado */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Satellite className="h-12 w-12 text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-destructive rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Título y descripción */}
          <div className="space-y-4 mb-8">
            <h1 className="text-6xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl font-bold text-foreground">
              Página no encontrada
            </h2>
            <p className="text-muted-foreground">
              Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>
          </div>

          {/* Código de error elegante */}
          <div className="bg-muted/30 rounded-xl p-4 mb-8">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
              <span>Error: 404_NOT_FOUND</span>
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-4">
            <Button asChild className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-primary/25 rounded-xl group">
              <Link href="/">
                <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Volver al Inicio
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full h-12 border-border/40 hover:border-border/60 hover:bg-accent/40 hover:text-foreground transition-all duration-200 group rounded-xl">
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Ir al Dashboard
              </Link>
            </Button>


          </div>
        </Card>

        {/* Información adicional */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-xs text-muted-foreground/70">
            Si crees que esto es un error, contacta al soporte técnico
          </p>
          <div className="flex justify-center space-x-4 text-xs text-muted-foreground/60">
            <span>• Código: NOT_FOUND</span>
            <span>• Status: 404</span>
            <span>• Time: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}