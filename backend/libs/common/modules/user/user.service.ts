import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserSystem } from "./user.type";
import { Role } from "@prisma/client/wasm";
import { createClient } from "@supabase/supabase-js";
import { ConfigService } from "@nestjs/config/dist/config.service";
import ws from "ws";
import { UserNotFoundError } from "./user.error";
import { CompleteProfileDto } from "./dtos/complete-profile.dto";
import { AppLoggerService } from "@app/common/appLogger/appLogger.service";



@Injectable()
export class UserService {
  private supabaseAdmin;

  constructor(private repo: UserRepository,
    private readonly configService: ConfigService, private logger: AppLoggerService,) {
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
  async update(id: string, data: { firstName: string; lastName: string }) {

    await this.findUnique(id)
    return  this.repo.update(id, {
      first_name: data.firstName,
      last_name: data.lastName,
    })
  }

  async completeProfile(userId: string, dto: CompleteProfileDto) {
    await this.findUnique(userId)

    const fullName = `${dto.firstName} ${dto.lastName}`;

    const { error } =
      await this.supabaseAdmin.auth.admin.updateUserById(
        userId,
        {
          user_metadata: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            fullName,
          },
        }
      );

    if (error) {
      this.logger.error("Failed to update user in Supabase", {
        userId,
        error: error.message,
      });
      throw new Error(error.message);

    }

    return  this.repo.update(userId, {
      first_name: dto.firstName,
      last_name: dto.lastName,
    })
  }

  async updateRole(userId:string,role:Role){
    await this.findUnique(userId);

    return this.repo.update(userId,{role:role})
  }



}
