import { Injectable, ForbiddenException } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";
import { ConfigService } from "@nestjs/config";
import { UserInvitationRepository } from "./user-invitation.repository";
import { UserService } from "../user/user.service";
import ws from "ws";


@Injectable()
export class UserInvitationService {
    private supabaseAdmin;

    constructor(
        private readonly repo: UserInvitationRepository,
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
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

    // 1. INVITAR USUARIO
    async inviteUser(dto: { email: string; role: any }) {
        const frontend = this.configService.get<string>("FRONTEND_URL");

        // 🔥 usar repo correcto
        const existing = await this.repo.isValid(dto.email);

        if (existing) {
            throw new ForbiddenException("Invitation already exists");
        }

        const { error } =
            await this.supabaseAdmin.auth.admin.inviteUserByEmail(dto.email, {
                redirectTo: `${frontend}/accept-invite`,
            });

        if (error) {
            throw new ForbiddenException(error.message);
        }
              const invitation = await this.repo.create({
            email: dto.email,
            role: dto.role,
        });

        return invitation;
    }

    // 2. ACEPTAR INVITACIÓN
    async acceptInvitation(userId: string, email: string) {

        const invitation = await this.repo.isValid(email);

        if (!invitation) {
            throw new ForbiddenException("Invitation not found");
        }

        const user = await this.userService.create(

            {
                id: userId,
                email,
                role: invitation.role,
            }
        ) ;

        await this.repo.markAccepted(invitation.id);

        return user;
    }

    
    async listinvitations(){
        return await this.repo.listInvitations();
    }

    async cancelInvitation(id: string) {
        return await this.repo.cancel(id);
    }
}