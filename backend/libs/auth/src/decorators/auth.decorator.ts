import { SetMetadata } from "@nestjs/common";
import { Role } from '@prisma/client';

export const AUTH_METADATA = {
  PUBLIC: "public",
  ROLES: "roles",
};

/**
 * Public route (no auth required)
 */
export const Public = () =>
  SetMetadata(AUTH_METADATA.PUBLIC, true);


export const Roles = (...roles: Role[]) =>
  SetMetadata(AUTH_METADATA.ROLES, roles);