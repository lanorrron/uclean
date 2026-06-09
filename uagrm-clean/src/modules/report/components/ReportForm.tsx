'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { LocationBadge } from './LocationBadge'
import { PermissionModal } from './PermissionModal'
import { useReportForm } from '../hooks/useReportForm'
import { usePermissionFlow } from '../hooks/usePermissionFlow'

export default function ReportForm() {
  // Estado para errores de campos
  const [fieldErrors, setFieldErrors] = useState({
    userType: '',
    registerNumber: '',
    incidentType: '',
    photo: '',
    location: ''
  })

  // Hooks
  const {
    formData,
    location,
    isSubmitting,
    submitted,
    userTypes,
    incidentTypes,
    updateFormData,
    setLocationCoords,
    submitReport
  } = useReportForm()

  const {
    showModal,
    modalStep,
    photo,
    photoPreview,
    videoRef,
    canvasRef,
    startFlow,
    capturePhoto,
    closeModal,
    reset: resetCamera
  } = usePermissionFlow()

  // Limpiar error de un campo específico
  const clearFieldError = (field: string) => {
    setFieldErrors(prev => ({ ...prev, [field]: '' }))
  }

  // Validar todos los campos al enviar
  const validateAllFields = (): boolean => {
    let isValid = true
    const newErrors = {
      userType: '',
      registerNumber: '',
      incidentType: '',
      photo: '',
      location: ''
    }

    // Validar Vínculo Universitario
    if (!formData.userType) {
      newErrors.userType = 'Selecciona tu vínculo universitario'
      isValid = false
    }

    // Validar Nro. Registro (solo números)
    if (!formData.registerNumber) {
      newErrors.registerNumber = 'Ingresa tu número de registro'
      isValid = false
    } else if (!/^\d+$/.test(formData.registerNumber)) {
      newErrors.registerNumber = 'El número de registro debe contener solo dígitos'
      isValid = false
    } else if (formData.registerNumber.length < 6) {
      newErrors.registerNumber = 'El número de registro debe tener al menos 6 dígitos'
      isValid = false
    }

    // Validar Tipo de Incidente
    if (!formData.incidentType) {
      newErrors.incidentType = 'Selecciona el tipo de incidente'
      isValid = false
    }

    // Validar Foto
    if (!photo) {
      newErrors.photo = 'Debes tomar una fotografía del área afectada'
      isValid = false
    }

    // Validar Ubicación
    if (!location.lat || !location.lon) {
      newErrors.location = 'Debes permitir el acceso a tu ubicación'
      isValid = false
    }

    setFieldErrors(newErrors)
    return isValid
  }

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview)
      }
    }
  }, [photoPreview])

  // Manejar inicio de flujo de permisos
  const handleStartFlow = async () => {
    try {
      await startFlow((coords) => {
        setLocationCoords(coords.lat, coords.lon)
        clearFieldError('location')
        toast.success('📍 Ubicación registrada correctamente')
      })
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al obtener permisos'
      setFieldErrors(prev => ({ ...prev, location: errorMsg }))
      toast.error(errorMsg)
    }
  }

  // Manejar captura de foto
  const handleCapture = async () => {
    try {
      const file = await capturePhoto()
      if (file) {
        clearFieldError('photo')
        toast.success('📸 Foto capturada correctamente')
      }
    } catch (err) {
      setFieldErrors(prev => ({ ...prev, photo: 'Error al capturar la foto' }))
      toast.error('Error al capturar la foto')
    }
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar todos los campos
    if (!validateAllFields()) {
      toast.error('Completa todos los campos requeridos')
      return
    }
    
    // Enviar reporte
    const result = await submitReport(photo)
    
    if (result.success) {
      toast.success('✅ ¡Reporte enviado exitosamente! El personal de limpieza lo atenderá')
      resetCamera()
      // Limpiar errores después de enviar
      setFieldErrors({
        userType: '',
        registerNumber: '',
        incidentType: '',
        photo: '',
        location: ''
      })
    } else if (result.error) {
      toast.error(result.error)
    }
  }

  // Manejar cambio en el número de registro (solo números)
  const handleRegisterNumberChange = (value: string) => {
    const numbersOnly = value.replace(/[^0-9]/g, '')
    updateFormData('registerNumber', numbersOnly)
    clearFieldError('registerNumber')
  }

  return (
    <>
      <section className="py-20 px-4 md:py-32 md:px-6" id="report-form">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-black text-primary">Reporte Rápido</h3>
            <p className="text-gray-500 mt-3">
              Ayúdanos a mantener el campus impecable. Tu reporte será atendido en tiempo real.
            </p>
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-12 h-1 rounded-full bg-primary/20" />
              <div className="w-8 h-1 rounded-full bg-primary" />
              <div className="w-2 h-1 rounded-full bg-secondary" />
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl md:rounded-3xl border border-gray-200 p-6 md:p-10 space-y-6">
            {/* Campos de texto */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Vínculo Universitario */}
              <div>
                <label className="text-xs font-bold text-primary uppercase tracking-wide block mb-2">
                  🎓 Vínculo Universitario <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full rounded-xl px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-primary/20 ${
                    fieldErrors.userType
                      ? 'border-2 border-red-500 bg-red-50'
                      : 'border border-gray-200 bg-white focus:border-primary'
                  }`}
                  value={formData.userType}
                  onChange={(e) => {
                    updateFormData('userType', e.target.value)
                    clearFieldError('userType')
                  }}
                >
                  <option value="">Selecciona tu perfil</option>
                  {userTypes.filter(opt => !opt.disabled).map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {fieldErrors.userType && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <span>⚠️</span> {fieldErrors.userType}
                  </p>
                )}
              </div>

              {/* Nro. Registro - Solo números */}
              <div>
                <label className="text-xs font-bold text-primary uppercase tracking-wide block mb-2">
                  🆔 Nro. Registro <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={`w-full rounded-xl px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-primary/20 ${
                    fieldErrors.registerNumber
                      ? 'border-2 border-red-500 bg-red-50'
                      : 'border border-gray-200 bg-white focus:border-primary'
                  }`}
                  placeholder="Ej. 219000000"
                  value={formData.registerNumber}
                  onChange={(e) => handleRegisterNumberChange(e.target.value)}
                />
                {fieldErrors.registerNumber && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <span>⚠️</span> {fieldErrors.registerNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Tipo de incidente */}
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wide block mb-2">
                ⚠️ Tipología del Incidente <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full rounded-xl px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-primary/20 ${
                  fieldErrors.incidentType
                    ? 'border-2 border-red-500 bg-red-50'
                    : 'border border-gray-200 bg-white focus:border-primary'
                }`}
                value={formData.incidentType}
                onChange={(e) => {
                  updateFormData('incidentType', e.target.value)
                  clearFieldError('incidentType')
                }}
              >
                <option value="">Selecciona el tipo de problema</option>
                {incidentTypes.filter(opt => !opt.disabled).map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {fieldErrors.incidentType && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <span>⚠️</span> {fieldErrors.incidentType}
                </p>
              )}
            </div>

            {/* Captura de evidencia */}
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wide block mb-2">
                📸 Captura de Evidencia <span className="text-red-500">*</span>
              </label>
              
              <div className="bg-blue-50 rounded-xl p-3 mb-4 flex items-start gap-2">
                <span className="text-blue-500 text-sm">📍</span>
                <p className="text-xs text-blue-700">
                  Se solicitará acceso a ubicación y cámara para geolocalizar el reporte.
                </p>
              </div>

              <div
                className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer transition-all ${
                  fieldErrors.photo || fieldErrors.location
                    ? 'border-2 border-red-500 ring-2 ring-red-200'
                    : 'border-2 border-dashed border-gray-300 hover:border-primary'
                } ${photoPreview ? '' : 'bg-gray-100'}`}
                onClick={handleStartFlow}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-primary">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-gray-600">Tomar Fotografía</p>
                    <p className="text-xs text-gray-400">Cámara obligatoria</p>
                  </div>
                )}
              </div>

              {/* Error de foto */}
              {fieldErrors.photo && (
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <span>⚠️</span> {fieldErrors.photo}
                </p>
              )}
              
              {/* Error de ubicación */}
              {fieldErrors.location && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <span>⚠️</span> {fieldErrors.location}
                </p>
              )}

              <LocationBadge lat={location.lat} lon={location.lon} />
            </div>

            {/* Observaciones */}
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wide block mb-2">
                📝 Observaciones (Opcional)
              </label>
              <textarea
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all min-h-[100px] resize-none"
                placeholder="Describe brevemente la situación..."
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
              />
            </div>

            {/* Botón enviar */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-primary text-white rounded-xl py-4 font-bold transition-all flex items-center justify-center gap-2  cursor-pointer ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  ENVIANDO...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2z" />
                  </svg>
                  TRANSMITIR REPORTE
                </>
              )}
            </button>

            {/* Éxito */}
            {submitted && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center text-sm font-semibold">
                ✅ ¡Reporte enviado exitosamente! El personal de limpieza lo atenderá.
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 pt-4 opacity-50">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A10 10 0 0010 2c-1.5 0-2.9.355-4.166.999L2.166 4.999z" clipRule="evenodd" />
              </svg>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                UAGRM Digital • Reporte Seguro
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Modal de permisos */}
      <PermissionModal
        isOpen={showModal}
        step={modalStep}
        onClose={closeModal}
        onCapture={handleCapture}
        videoRef={videoRef}
        canvasRef={canvasRef}
      />
    </>
  )
}