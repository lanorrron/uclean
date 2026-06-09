// components/report/PermissionModal.tsx
import { RefObject } from 'react'

interface PermissionModalProps {
  isOpen: boolean
  step: 'location' | 'capture'
  onClose: () => void
  onCapture: () => void
  videoRef: RefObject<HTMLVideoElement | null>  // ← Cambiado para aceptar null
  canvasRef: RefObject<HTMLCanvasElement | null> // ← Cambiado para aceptar null
}

export const PermissionModal = ({
  isOpen,
  step,
  onClose,
  onCapture,
  videoRef,
  canvasRef
}: PermissionModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-primary p-5 text-white">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-lg">
              {step === 'location' && '📍 Permiso de Ubicación'}
              {step === 'capture' && '📸 Tomar Fotografía'}
            </h4>
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {step === 'location' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-gray-600">Necesitamos acceder a tu ubicación para geolocalizar el reporte.</p>
              <p className="text-sm text-gray-400 mt-2">Esperando tu autorización...</p>
            </div>
          )}
          
          {step === 'capture' && (
            <div>
              <div className="relative rounded-xl overflow-hidden bg-black">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted
                  className="w-full h-auto max-h-[400px] object-cover" 
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              <button
                onClick={onCapture}
                className="w-full mt-4 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                📸 Tomar Fotografía
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}