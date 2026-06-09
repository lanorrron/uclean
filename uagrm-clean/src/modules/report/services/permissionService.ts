// services/permissionService.ts

export interface LocationCoords {
  lat: number
  lon: number
}

export const requestLocation = (): Promise<LocationCoords> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalización no soportada'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      },
      () => reject(new Error('Debes permitir la ubicación para continuar')),
      { enableHighAccuracy: true }
    )
  })
}

export const requestCamera = async (videoElement: HTMLVideoElement): Promise<MediaStream> => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' }
  })
  videoElement.srcObject = stream
  await videoElement.play()
  return stream
}

export const capturePhoto = (
  videoElement: HTMLVideoElement,
  canvasElement: HTMLCanvasElement
): Promise<File> => {
  return new Promise((resolve) => {
    const context = canvasElement.getContext('2d')
    if (!context) return

    canvasElement.width = videoElement.videoWidth
    canvasElement.height = videoElement.videoHeight
    context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height)

    canvasElement.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `report_${Date.now()}.jpg`, { type: 'image/jpeg' })
        resolve(file)
      }
    }, 'image/jpeg', 0.9)
  })
}

export const stopCamera = (stream: MediaStream | null) => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
  }
}