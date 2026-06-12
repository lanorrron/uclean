import { HttpResponse } from "@app/common/errors/httpResponse";
import { Controller, Delete, Get, Req } from "@nestjs/common";
import { UserInvitationService } from "libs/common/modules/invitation-user/user-invitation.service";
import { UserService } from "libs/common/modules/user/user.service";


@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService, private readonly invitationService: UserInvitationService) { }

    @Get("me")
    async me(@Req() req: any) {
        const result = await this.userService.findUnique(req.user.userId);
        return HttpResponse.Success(result);
    }

    @Get()
    async allUserPlusInvitations(@Req() req: any) {
        const users = await this.userService.findMany(req.user.role);
        const invitations = await this.invitationService.listinvitations();
        return HttpResponse.Success({ users, invitations });
    }

    @Delete(":id")
    async remove(@Req() req: any) {
        const result = await this.userService.remove(req.params.id);
        return HttpResponse.Success(result);
    }
}