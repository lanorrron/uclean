import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserSystem } from "./user.type";


@Injectable()
export class UserService {

    constructor(private repo:UserRepository){}

  async findUnique(id: string) {
    return this.repo.findById(id)
    } 

    async create(user:Omit<CreateUserSystem, | "createdAt" | "updated_at">){
        return this.repo.create(user)
    }
 }
