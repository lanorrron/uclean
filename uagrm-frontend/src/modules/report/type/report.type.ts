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

    image_url?: string | null;

    latitude: number;
    longitude: number;

    status: ReportStatus;

    created_at: Date;
    updated_at: Date;

    assigned_to_id?: string | null;
    assigned_to?: User
};


export enum IncidentType {
    WASTE = "WASTE",
    BATHROOM = "BATHROOM",
    LIGHTING = "LIGHTING",
    FURNITURE = "FURNITURE",
    OTHER = "OTHER",
}

export type DatePreset = "today" | "7d" | "month" | "custom";

export interface GetReportsParams {

  page?: number;

  pageSize?: number;

  status?: string;

  from?: string;

  to?: string;
}
export interface ReportQuery {
  status?: ReportStatus;

  from?: string;
  to?: string;


}