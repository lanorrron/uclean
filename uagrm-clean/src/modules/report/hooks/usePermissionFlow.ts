// hooks/usePermissionFlow.ts
import { useState } from 'react'
import toast from 'react-hot-toast'

import { useCamera } from './useCamera'
import { requestLocation } from '../services/permissionService'

export const usePermissionFlow = () => {
  const [showModal, setShowModal] = useState(false)

  const [modalStep, setModalStep] = useState<
    'location' | 'capture'
  >('location')

  const [isRequesting, setIsRequesting] = useState(false)

  const {
    photo,
    photoPreview,
    videoRef,
    canvasRef,
    startCamera,
    takePhoto,
    stopCameraStream,
    resetPhoto
  } = useCamera()

  const startFlow = async (
    onLocationSuccess: (
      coords: { lat: number; lon: number }
    ) => void
  ) => {
    setIsRequesting(true)
    setShowModal(true)
    setModalStep('location')

    try {
      // ==================================================
      // PASO 1: VERIFICAR PERMISO DE UBICACIÓN
      // ==================================================

      if ('permissions' in navigator) {
        const locationPermission =
          await navigator.permissions.query({
            name: 'geolocation'
          })

        if (locationPermission.state === 'denied') {
          toast.error(
            'La ubicación está bloqueada. Habilítala desde tu navegador.'
          )

          setShowModal(false)

          return
        }
      }

      // ==================================================
      // PASO 2: SOLICITAR UBICACIÓN
      // ==================================================

      const coords = await requestLocation()

      onLocationSuccess(coords)

      // ==================================================
      // PASO 3: MOSTRAR CÁMARA
      // ==================================================

      setModalStep('capture')

      // Esperar render del modal
      await new Promise(resolve => setTimeout(resolve, 300))

      // ==================================================
      // PASO 4: VERIFICAR PERMISO DE CÁMARA
      // ==================================================

      if ('permissions' in navigator) {
        try {
          const cameraPermission =
            await navigator.permissions.query({
              name: 'camera' as PermissionName
            })

          if (cameraPermission.state === 'denied') {
            toast.error(
              'La cámara está bloqueada. Habilítala desde tu navegador.'
            )

            setShowModal(false)

            return
          }
        } catch {
          // Safari no soporta "camera"
        }
      }

      // ==================================================
      // PASO 5: INICIAR CÁMARA
      // ==================================================

      await startCamera()

    } catch (err) {
      console.error(err)

      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Error al solicitar permisos'

      toast.error(errorMsg)

      setShowModal(false)

    } finally {
      setIsRequesting(false)
    }
  }

  const capturePhoto = async () => {
    try {
      const file = await takePhoto()

      setShowModal(false)

      stopCameraStream()

      return file

    } catch (err) {
      console.error(err)

      toast.error('Error al capturar la fotografía')

      return null
    }
  }

  const closeModal = () => {
    stopCameraStream()

    setShowModal(false)

    setModalStep('location')
  }

  const reset = () => {
    resetPhoto()
  }

  return {
    // Estado
    showModal,
    modalStep,
    isRequesting,

    // Cámara
    photo,
    photoPreview,
    videoRef,
    canvasRef,

    // Acciones
    startFlow,
    capturePhoto,
    closeModal,
    reset,
    stopCamera: stopCameraStream
  }
}