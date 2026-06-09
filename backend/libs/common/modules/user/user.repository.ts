import { Injectable } from "@nestjs/common";
import { DatabaseService } from "libs/common/database/database.service";
import { CreateUserSystem } from "./user.type";
import { Role } from "@prisma/client";


@Injectable()
export class UserRepository {
    constructor(private readonly db: DatabaseService) { }

    async findById(id: string) {
        return this.db.user.findUnique({
            where: { id }
        })
    }

    async create (data:CreateUserSystem){
        return this.db.user.create({
            data:{
                ...data,
                role:data.role?? Role.USER
            }
        })
    }


}