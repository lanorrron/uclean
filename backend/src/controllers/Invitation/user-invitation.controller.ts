import { Public } from "@app/auth/decorators/auth.decorator";
import { HttpResponse } from "@app/common/errors/httpResponse";
import {
    Body,
    Controller,
    Get,
    Post,
    Req,
} from "@nestjs/common";
import { CreateUserInvitationDto } from "libs/common/modules/invitation-user/dtos/create-invitation.dto";
import { UserInvitationService } from "libs/common/modules/invitation-user/user-invitation.service";

@Controller("invitations")
export class UserInvitationController {
    constructor(
        private readonly service: UserInvitationService
    ) { }

    @Public()
    @Post("invite")
    async inviteUser(
        @Body()
        dto: CreateUserInvitationDto) {
        const result = await this.service.inviteUser(dto);
        return HttpResponse.Success(result);
    }

    @Post("accept")
    async acceptInvitation(@Req() req: any) {
        const result = await this.service.acceptInvitation(
            req.user.sub,
            req.user.email
        );
        return HttpResponse.Success(result);
    }
    
    @Get('')
    async getInvitations(){
        const result= await this.service.listinvitations();
         return HttpResponse.Success(result);
    }
}