// hooks/useReportForm.ts
import { useState } from 'react'
import { sendReport } from '../services/reportService'
import { IncidentType, incidentTypeToArea } from '../types/report.types'

const userTypes = [
  { value: '', label: 'Selecciona tu perfil', disabled: true },
  { value: 'STUDENT', label: '🎓 Estudiante' },
  { value: 'TEACHER', label: '👨‍🏫 Docente' },
  { value: 'ADMIN', label: '👔 Administrativo' },
  { value: 'VISITOR', label: '👤 Visitante' }
]

const incidentTypes = [
  { value: '', label: 'Selecciona el tipo de problema', disabled: true },
  { value: IncidentType.WASTE, label: '🗑️ Residuos Sólidos' },
  { value: IncidentType.BATHROOM, label: '🚽 Baños / Sanitarios' },
  { value: IncidentType.LIGHTING, label: '💡 Iluminación' },
  { value: IncidentType.FURNITURE, label: '🪑 Mobiliario Dañado' },
]

export const useReportForm = () => {
  const [formData, setFormData] = useState({
    userType: '',
    registerNumber: '',
    incidentType: '',
    description: '',
    area:''
  })

  const [location, setLocation] = useState<{ lat: number | null; lon: number | null }>({
    lat: null,
    lon: null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const setLocationCoords = (lat: number, lon: number) => {
    setLocation({ lat, lon })
  }


  const validateForm = (photo: File | null): { isValid: boolean; error: string | null } => {
    if (!formData.userType) {
      return { isValid: false, error: 'Selecciona tu vínculo universitario' }
    }

    if (!formData.registerNumber) {
      return { isValid: false, error: 'Ingresa tu número de registro' }
    }

    if (!formData.incidentType) {
      return { isValid: false, error: 'Selecciona el tipo de incidente' }
    }

    if (!photo) {
      return { isValid: false, error: 'Debes tomar una fotografía' }
    }

    if (!location.lat || !location.lon) {
      return { isValid: false, error: 'Debes permitir la ubicación' }
    }

    return { isValid: true, error: null }
  }

  // SUBMIT REPORT - Retorna objeto con success y error
  const submitReport = async (photo: File | null): Promise<{ success: boolean; error?: string }> => {
    setIsSubmitting(true)
    const area = incidentTypeToArea[formData.incidentType]

    try {
      await sendReport({
        userType: formData.userType,
        registerNumber: formData.registerNumber,
        incidentType: formData.incidentType,
        description: formData.description,
        latitude: location.lat,
        longitude: location.lon,
        area:area
      }, photo)

      setSubmitted(true)

      // Resetear formulario
      setFormData({
        userType: '',
        registerNumber: '',
        incidentType: '',
        description: '',
        area:''
      })
      setLocation({ lat: null, lon: null })

      setTimeout(() => setSubmitted(false), 3000)

      return { success: true }

    } catch (err) {
      const errorMsg = 'Error al enviar el reporte. Intenta nuevamente.'
      return { success: false, error: errorMsg }
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      userType: '',
      registerNumber: '',
      incidentType: '',
      description: '',
      area:''
    })
    setLocation({ lat: null, lon: null })
    setSubmitted(false)
  }

  return {
    // Datos
    formData,
    location,
    isSubmitting,
    submitted,

    // Opciones
    userTypes,
    incidentTypes,

    // Acciones
    updateFormData,
    setLocationCoords,
    validateForm,
    submitReport,
    resetForm
  }
}