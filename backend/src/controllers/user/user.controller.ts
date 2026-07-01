import { Roles } from "@app/auth/decorators/auth.decorator";
import { HttpResponse } from "@app/common/errors/httpResponse";
import { Body, Controller, Delete, Get, Req, Put, Param } from "@nestjs/common";
import { Role } from "@prisma/client";
import { UserInvitationService } from "libs/common/modules/invitation-user/user-invitation.service";
import { CompleteProfileDto } from "libs/common/modules/user/dtos/complete-profile.dto";
import { UpdateRoleDto } from "libs/common/modules/user/dtos/update-role.dto";
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
        const users = await this.userService.findMany();
        const invitations = await this.invitationService.listinvitations();
        return HttpResponse.Success({ users, invitations });
    }
    @Roles(Role.ADMIN)
    @Delete(":id")
    async remove(@Req() req: any) {
        const result = await this.userService.remove(req.params.id, req.user.role);
        return HttpResponse.Success(result);
    }

    @Put("complete-profile")
    async completeProfile(
        @Req() req,
        @Body() dto: CompleteProfileDto
    ) {
        const result = await this.userService.completeProfile(
            req.user.userId,
            dto
        );
        return HttpResponse.Success(result);
    }

    @Roles(Role.ADMIN)
    @Put(':id/update-role')
    async updateRole(
        @Param('id') id: string,
        @Body() body: UpdateRoleDto,
    ) {

        const result =
            await this.userService.updateRole(
                id,
                body.role,
            );

        return HttpResponse.Success(result);
    }

}