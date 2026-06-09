// hooks/useCamera.ts
import { useState, useRef, useCallback } from 'react'
import { capturePhoto, requestCamera, stopCamera } from '../services/permissionService'
import toast from 'react-hot-toast'

export const useCamera = () => {
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = useCallback(async () => {
    if (!videoRef.current) {
      console.error('Video element not found')
      setCameraError('Elemento de video no encontrado')
      return
    }
    
    try {
      setCameraError(null)
      console.log('Solicitando cámara...')
      
      const stream = await requestCamera(videoRef.current)
      streamRef.current = stream
      
      // Verificar que el video realmente se está reproduciendo
      const video = videoRef.current
      
      // Esperar a que el video tenga datos
      await new Promise((resolve) => {
        if (video.readyState >= 2) {
          resolve(true)
        } else {
          video.addEventListener('canplay', resolve, { once: true })
        }
      })
      
      setIsCameraReady(true)
      console.log('Cámara iniciada correctamente')
      return stream
      
    } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Error al iniciar cámara'
      setCameraError(errorMsg)
            toast.error(errorMsg)
    }
  }, [])

  const takePhoto = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) {
      console.error('Video o canvas no disponibles')
      return null
    }
    
    if (!isCameraReady) {
      console.error('Cámara no está lista')
      return null
    }
    
    try {
      console.log('Tomando foto...')
      const file = await capturePhoto(videoRef.current, canvasRef.current)
      
      if (file) {
        // Limpiar preview anterior si existe
        if (photoPreview) {
          URL.revokeObjectURL(photoPreview)
        }
        
        setPhoto(file)
        setPhotoPreview(URL.createObjectURL(file))
        console.log('Foto capturada:', file.name, file.size)
      }
      
      return file
      
    } catch (error) {
      console.error('Error al tomar foto:', error)
      setCameraError('Error al capturar la foto')
      return null
    }
  }, [isCameraReady, photoPreview])

  const stopCameraStream = useCallback(() => {
    console.log('Deteniendo cámara...')
    stopCamera(streamRef.current)
    streamRef.current = null
    setIsCameraReady(false)
  }, [])

  const resetPhoto = useCallback(() => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview)
    }
    setPhoto(null)
    setPhotoPreview(null)
    setCameraError(null)
  }, [photoPreview])

  return {
    photo,
    photoPreview,
    videoRef,
    canvasRef,
    startCamera,
    takePhoto,
    stopCameraStream,
    resetPhoto,
    isCameraReady,
    cameraError
  }
}