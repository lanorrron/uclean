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
  CLEANING = "CLEANING",
  MAINTENANCE = "MAINTENANCE",
  SECURITY = "SECURITY"
}


export interface ReportResponse {
  success: boolean
  message: string
  reportId?: string
}

export const incidentTypeToArea: Record<string, AreaType> = {
  WASTE: AreaType.CLEANING,
  BATHROOM: AreaType.CLEANING,
  LIGHTING: AreaType.MAINTENANCE,
  FURNITURE: AreaType.MAINTENANCE,
  SECURITY: AreaType.SECURITY,
};

export enum IncidentType {
  WASTE = "WASTE",
  BATHROOM = "BATHROOM",
  LIGHTING = "LIGHTING",
  FURNITURE = "FURNITURE",
  SECURITY = "SECURITY",
  OTHER = "OTHER",
}