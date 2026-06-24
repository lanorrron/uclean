import { AcceptInvitationAuth } from "@app/auth/decorators/accept-invitation.decorator";
import { Roles } from "@app/auth/decorators/auth.decorator";
import { HttpResponse } from "@app/common/errors/httpResponse";
import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Req,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { CreateUserInvitationDto } from "libs/common/modules/invitation-user/dtos/create-invitation.dto";
import { UserInvitationService } from "libs/common/modules/invitation-user/user-invitation.service";

@Controller("invitations")
export class UserInvitationController {
    constructor(
        private readonly service: UserInvitationService
    ) { }

    @Roles(Role.ADMIN)
    @Post("invite")
    async inviteUser(
        @Body()
        dto: CreateUserInvitationDto) {
        const result = await this.service.inviteUser(dto);
        return HttpResponse.Success(result);
    }

    @AcceptInvitationAuth()
    @Post("accept")
    async acceptInvitation(@Req() req: any) {
        const result = await this.service.acceptInvitation(
            req.user.supabaseId,
            req.user.email
        );
        return HttpResponse.Success(result);
    }

    @Get('')
    async getInvitations() {
        const result = await this.service.listinvitations();
        return HttpResponse.Success(result);
    }

    @Roles(Role.ADMIN)
    @Put(':id/cancel')
    async cancelInvitation(@Req() req: any) {
        const result = await this.service.cancelInvitation(req.params.id);
        return HttpResponse.Success(result);
    }
}