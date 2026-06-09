// hooks/useReportForm.ts
import { useState } from 'react'
import { sendReport } from '../services/reportService'

const userTypes = [
  { value: '', label: 'Selecciona tu perfil', disabled: true },
  { value: 'STUDENT', label: '🎓 Estudiante' },
  { value: 'TEACHER', label: '👨‍🏫 Docente' },
  { value: 'ADMIN', label: '👔 Administrativo' },
  { value: 'VISITOR', label: '👤 Visitante' }
]

const incidentTypes = [
  { value: '', label: 'Selecciona el tipo de problema', disabled: true },
  { value: 'WASTE', label: '🗑️ Residuos Sólidos' },
  { value: 'BATHROOM', label: '🚽 Baños / Sanitarios' },
  { value: 'LIGHTING', label: '💡 Iluminación' },
  { value: 'FURNITURE', label: '🪑 Mobiliario Dañado' },
  { value: 'OTHER', label: '📌 Otros' }
]

export const useReportForm = () => {
  const [formData, setFormData] = useState({
    userType: '',
    registerNumber: '',
    incidentType: '',
    description: ''
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

  // VALIDATE FORM - Retorna objeto con isValid y error
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

    try {
      await sendReport({
        userType: formData.userType,
        registerNumber: formData.registerNumber,
        incidentType: formData.incidentType,
        description: formData.description,
        latitude: location.lat,
        longitude: location.lon
      }, photo)

      setSubmitted(true)

      // Resetear formulario
      setFormData({
        userType: '',
        registerNumber: '',
        incidentType: '',
        description: ''
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
      description: ''
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