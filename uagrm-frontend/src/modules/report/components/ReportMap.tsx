"use client";

import {
  ExternalLink,
  MapPin,
  Navigation,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGoogleMap } from "@/shared/hooks/useGoogleMap";

interface Props {
  latitude: number;
  longitude: number;
}

export default function ReportMap({ latitude, longitude }: Props) {
  const { mapRef, loaded, zoomIn, zoomOut } = useGoogleMap({
    lat: latitude,
    lng: longitude,
  });

  return (
    <Card className="border-border/50 shadow-sm overflow-hidden">
      <CardContent className="">
        <div className="mx-2 pb-2 flex items-center justify-between ">
          <h3 className="font-semibold text-base flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Ubicación
          </h3>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={zoomIn}
              disabled={!loaded}
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={zoomOut}
              disabled={!loaded}
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div
          ref={mapRef}
          className="h-[300px] w-full bg-muted/20 rounded-b-xl overflow-hidden"
        >
          {!loaded && (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          )}
        </div>

        <div className="p-4 flex items-center justify-between flex-wrap gap-2 border-t border-border/50 bg-muted/10">
          <div className="flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-muted-foreground" />
            <code className="text-[11px] font-mono">
              {latitude.toFixed(5)}°, {longitude.toFixed(5)}°
            </code>
          </div>
          <a
            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            Abrir en Google Maps
          </a>
        </div>
      </CardContent>
    </Card>
  );
}