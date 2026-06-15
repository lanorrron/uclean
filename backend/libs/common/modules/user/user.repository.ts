import { Injectable } from "@nestjs/common";
import { DatabaseService } from "libs/common/database/database.service";
import { CreateUserSystem } from "./user.type";
import { Prisma, Role } from "@prisma/client";

@Injectable()
export class UserRepository {
    constructor(private readonly db: DatabaseService) { }

    async findById(id: string) {
        return this.db.user.findUnique({
            where: { id, deleted_at: null }
        });
    }

async findMany(role?: Role) {
    return this.db.user.findMany({
        where: {
            deleted_at: null,
            ... (role ? { role } : {})
        }
    });
}

    async create(data: CreateUserSystem) {
        return this.db.user.create({
            data: {
                ...data,
                role: data.role
            }
        });
    }
    async remove(id: string) {
        return this.db.user.update({
            where: { id },
            data: { deleted_at: new Date() }
        });
    }

    async update(id: string, data: Partial<Prisma.UserUpdateInput>) {
        return this.db.user.update({
            where: { id },
            data,
        });
    }

}