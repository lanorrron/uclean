import { Role } from "@/modules/user/types/user.type";

export const rolesArray = [
    {
        value: Role.ADMIN,
        label: "Admin",
    },
    {
        value: Role.AGENT,
        label: "Agente",
    },
    {
        value: Role.MODERATOR,
        label: "Moderador",
    },
];