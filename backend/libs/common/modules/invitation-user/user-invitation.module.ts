import { Module } from "@nestjs/common";

import { UserInvitationRepository } from "./user-invitation.repository";
import { UserInvitationService } from "./user-invitation.service";
import { UserModule } from "../user/user.module";
import { SupabaseModule } from "@app/common/supabase/supabase.module";

@Module({
    imports:[UserModule, SupabaseModule],
    providers:[UserInvitationRepository, UserInvitationService],
    exports:[UserInvitationService]

})
export class UserInvitationModule {}