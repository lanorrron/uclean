export interface ReportData {
  userType: string
  registerNumber: string
  incidentType: string
  description: string
  latitude: number | null
  longitude: number | null
  area:AreaType
}

export enum AreaType {
  LIMPIEZA = "LIMPIEZA",
  MANTENIMIENTO = "MANTENIMIENTO",
}


export interface ReportResponse {
  success: boolean
  message: string
  reportId?: string
}

export const incidentTypeToArea: Record<string, AreaType> = {
  WASTE: AreaType.LIMPIEZA,
  BATHROOM: AreaType.LIMPIEZA,
  LIGHTING: AreaType.MANTENIMIENTO,
  FURNITURE: AreaType.MANTENIMIENTO,
};

export enum IncidentType {
  WASTE = "WASTE",
  BATHROOM = "BATHROOM",
  LIGHTING = "LIGHTING",
  FURNITURE = "FURNITURE",
  OTHER = "OTHER",
}