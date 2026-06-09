import { HttpResponse } from "@app/common/errors/httpResponse";
import { Controller, Get, Req } from "@nestjs/common";
import { UserService } from "libs/common/modules/user/user.service";


@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("me")
    async me(@Req() req: any) {
        const result = await this.userService.findUnique(req.user.userId);
        return HttpResponse.Success(result);
    }
}