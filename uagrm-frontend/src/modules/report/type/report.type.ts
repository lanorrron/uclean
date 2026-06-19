import { User, UserType } from "@/modules/user/types/user.type";

export enum ReportStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
}

export type Report = {
  id: string;

  user_type: UserType;
  register_number: string;

  incident_type: IncidentType;

  description?: string | null;

  report_image_url: string
  resolved_image_url?: string

  resolved_at: Date

  latitude: number;
  longitude: number;

  status: ReportStatus;
  area: AreaType;

  created_at: Date;
  updated_at: Date;

  assigned_to_id?: string | null;
  assigned_to?: User
};

export enum AreaType {
  LIMPIEZA = "LIMPIEZA",
  MANTENIMIENTO = "MANTENIMIENTO",
  OTROS = "OTROS",
}


export enum IncidentType {
  WASTE = "WASTE",
  BATHROOM = "BATHROOM",
  LIGHTING = "LIGHTING",
  FURNITURE = "FURNITURE",
}

export type DatePreset = "today" | "7d" | "month" | "custom";

export interface GetReportsParams {

  page?: number;

  pageSize?: number;

  status?: ReportStatus[];

  from?: string;

  to?: string;

  area?: AreaType;

  assignedToId?: string;

  unassignedOnly?: boolean;
}
export interface ReportQuery {
  status?: ReportStatus;

  from?: string;
  to?: string;


}