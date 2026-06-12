import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserSystem } from "./user.type";
import { Role } from "@prisma/client/wasm";
import { createClient } from "@supabase/supabase-js";
import { ConfigService } from "@nestjs/config/dist/config.service";
import ws from "ws";
import { UserNotFoundError } from "./user.error";



@Injectable()
export class UserService {
  private supabaseAdmin;

  constructor(private repo: UserRepository,
    private readonly configService: ConfigService,) {
    this.supabaseAdmin = createClient(
      this.configService.get<string>("SUPABASE_URL")!,
      this.configService.get<string>("SUPABASE_SERVICE_ROLE")!,
      {
        realtime: {
          transport: ws,
        },
      },
    );
  }

  async findUnique(id: string) {
    const user = await this.repo.findById(id)
    if (!user) {
      throw new UserNotFoundError()
    }
    return user
  }

  async create(user: Omit<CreateUserSystem, | "createdAt" | "updated_at">) {
    return this.repo.create(user)
  }

  async findMany(role: Role) {
    return this.repo.findMany(role)
  }

  async remove(id: string) {
    const user = await this.findUnique(id)
    await this.supabaseAdmin.auth.admin.deleteUser(user.id)
    return await this.repo.remove(id)


  }
}
