import { Role } from "@prisma/client";


export type CreateUserSystem = {
  id: string;
  email: string;
  role?: Role;
};