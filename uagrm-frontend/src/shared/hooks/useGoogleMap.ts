"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useTheme } from "next-themes";

interface Props {
  lat: number;
  lng: number;
}

declare global {
  interface Window {
    google: any;
  }
}

const darkMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#0f172a" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#cbd5e1" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#020617" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1e293b" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#020617" }],
  },
];

const lightMapStyle: any = [];

export function useGoogleMap({
  lat,
  lng,
}: Props) {

  const { theme } =
    useTheme();

  const mapRef =
    useRef<HTMLDivElement>(null);

  const mapInstanceRef =
    useRef<any>(null);

  const markerRef =
    useRef<any>(null);

  const [loaded, setLoaded] =
    useState(false);

  const apiKey =
    process.env
      .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // LOAD SCRIPT
  useEffect(() => {

    if (window.google?.maps) {
      setLoaded(true);
      return;
    }

    const script =
      document.createElement("script");

    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

    script.async = true;
    script.defer = true;

    script.onload = () => {
      setLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };

  }, []);

  // CREATE MAP
  useEffect(() => {

    if (
      !loaded ||
      !mapRef.current
    ) return;

    const center = {
      lat,
      lng,
    };

    const map =
      new window.google.maps.Map(
        mapRef.current,
        {
          center,
          zoom: 16,
          mapTypeId: "roadmap",
          disableDefaultUI: true,
          streetViewControl: true,
          fullscreenControl: true,

          mapTypeControl: true,

          styles:
            theme === "dark"
              ? darkMapStyle
              : lightMapStyle,
        }
      );

    const marker =
      new window.google.maps.Marker({
        position: center,
        map,

        animation:
          window.google.maps.Animation.DROP,
      });

    mapInstanceRef.current = map;
    markerRef.current = marker;

    return () => {
      marker.setMap(null);
    };

  }, [loaded, lat, lng]);

  // 🔥 ONLY UPDATE THEME
  useEffect(() => {

    if (!mapInstanceRef.current)
      return;

    mapInstanceRef.current.setOptions({
      styles:
        theme === "dark"
          ? darkMapStyle
          : lightMapStyle,
    });

  }, [theme]);

  const zoomIn = () => {

    if (!mapInstanceRef.current)
      return;

    mapInstanceRef.current.setZoom(
      mapInstanceRef.current.getZoom() + 1
    );
  };

  const zoomOut = () => {

    if (!mapInstanceRef.current)
      return;

    mapInstanceRef.current.setZoom(
      mapInstanceRef.current.getZoom() - 1
    );
  };

  const setMapType = (
    type:
      | "roadmap"
      | "satellite"
      | "hybrid"
      | "terrain"
  ) => {

    if (!mapInstanceRef.current)
      return;

    mapInstanceRef.current.setMapTypeId(type);
  };

  return {
    mapRef,
    loaded,

    zoomIn,
    zoomOut,

    setMapType,
  };
}