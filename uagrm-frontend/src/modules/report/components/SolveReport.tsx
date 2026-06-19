"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

import { useCamera } from "../hooks/useCamera";
import { useResolveReport } from "../hooks/useResolveReport";

interface Props {
  reportId: string;
  onSuccess?:()=> void
}

export default function SolveReport({ reportId, onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"camera" | "preview">("camera");

  const {
    videoRef,
    canvasRef,
    startCamera,
    takePhoto,
    stopCameraStream,
    photo,
    photoPreview,
    resetPhoto,
    isCameraReady,
  } = useCamera();

  const { resolveReport, loading } = useResolveReport();


  useEffect(() => {
    if (!open) {
      stopCameraStream();
      resetPhoto();
      return;
    }

    setStep("camera");

    const timer = setTimeout(() => {
      startCamera();
    }, 300);

    return () => clearTimeout(timer);
  }, [open]);


  const handleTakePhoto = async () => {
    const file = await takePhoto();
    if (file) setStep("preview");
  };


  const handleConfirm = async () => {
    if (!photo) return;

    await resolveReport(reportId, photo);
 await onSuccess?.(); 

    stopCameraStream();
    resetPhoto();
    setOpen(false);
  };


  const handleRetake = async () => {
    resetPhoto();
    setStep("camera");

    setTimeout(() => {
      startCamera();
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Camera className="w-4 h-4" />
          Resolver con foto
        </Button>
      </DialogTrigger>

      {/* =========================
          MODAL FIX (IMPORTANTE)
      ========================= */}
      <DialogContent className="max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>Capturar evidencia</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col flex-1 gap-3 overflow-hidden">
          {/* =========================
              CAMERA VIEW
          ========================= */}
          {step === "camera" && (
            <div className="flex flex-col gap-3 flex-1">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-md bg-black"
              />

              <canvas ref={canvasRef} className="hidden" />

              <Button
                className="w-full"
                onClick={handleTakePhoto}
                disabled={!isCameraReady}
              >
                Tomar foto
              </Button>
            </div>
          )}

          {/* =========================
              PREVIEW VIEW
          ========================= */}
          {step === "preview" && photo && photoPreview && (
            <div className="flex flex-col flex-1 gap-3 overflow-auto">
              
              <img
                src={photoPreview}
                alt="preview"
                className="w-full max-h-[300px] object-cover rounded-md"
              />

              {/* BOTONES CORRECTAMENTE POSICIONADOS */}
              <div className="flex flex-col gap-2 mt-auto">
                <Button
                  className="w-full"
                  onClick={handleConfirm}
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Confirmar"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleRetake}
                >
                  Repetir
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}