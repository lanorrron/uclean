export interface User {
  id: string;
  email: string;
  name: string | null;
  role: "ADMIN" | "MODERATOR" | "AGENT";
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
  MODERATOR = "MODERATOR",
  AGENT = "AGENT",
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