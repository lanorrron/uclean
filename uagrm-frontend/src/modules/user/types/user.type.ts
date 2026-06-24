export interface User {
  id: string;
  email: string;
  first_name:string;
  last_name: string | null;
  role: Role
  created_at: string;
  updated_at: string;
}

export enum UserType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  VISITOR = "VISITOR"
}

export enum Role {
  ADMIN = "ADMIN",
  MANTENIMINETO = "MAINTENANCE",
  LIMPIEZA = "CLEANING",
  SEGURIDAD = "SECURITY"
}
export interface UserPlusInvitations {
  users: User[];
  invitations: Invitation[];
}

export type InvitationStatus = "PENDING" | "ACCEPTED" | "CANCELLED";
export interface Invitation {
  id: string;

  email: string;
  role: Role;

  status: InvitationStatus;

  createdById: string | null;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}