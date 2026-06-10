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

    assigned_to_id?: string | null;
};

export enum UserType {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    VISITOR = "VISITOR"
}
export enum IncidentType {
    WASTE = "WASTE",
    BATHROOM = "BATHROOM",
    LIGHTING = "LIGHTING",
    FURNITURE = "FURNITURE",
    OTHER = "OTHER",
}

