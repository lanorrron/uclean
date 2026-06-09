// services/reportService.ts
export interface ReportData {
  userType: string
  registerNumber: string
  incidentType: string
  description: string
  latitude: number | null
  longitude: number | null
}

export interface ReportResponse {
  success: boolean
  message: string
  reportId?: string
}

const BASE_URL= process.env.NEXT_PUBLIC_API_URL

export const sendReport = async (data: ReportData, photoFile: File | null): Promise<ReportResponse> => {
  const formData = new FormData()
  
  // Datos del formulario
  formData.append('userType', data.userType)
  formData.append('registerNumber', data.registerNumber)
  formData.append('incidentType', data.incidentType)
  formData.append('description', data.description)
  formData.append('latitude', String(data.latitude))
  formData.append('longitude', String(data.longitude))
  
  // Foto
  if (photoFile) {
    formData.append('image', photoFile)
  }
  
  // Cambia esta URL por la de tu backend
  const response = await fetch(`${BASE_URL}/reports`, {
    method: 'POST',
    body: formData,
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al enviar el reporte')
  }
  
  return response.json()
}