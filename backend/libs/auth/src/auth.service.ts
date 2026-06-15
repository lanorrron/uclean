import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { Reflector } from "@nestjs/core";

import { AppLoggerService } from "@app/common/appLogger/appLogger.service";

import { ConfigService } from "@nestjs/config";

import { UserService } from "libs/common/modules/user/user.service";

import { UserNotFoundError } from "libs/common/modules/user/user.error";

import { SupabaseClient } from "@supabase/supabase-js";
import { ACCEPT_INVITATION_KEY } from "./decorators/accept-invitation.decorator";


@Injectable()
export class AuthService {

  constructor(
    private logger: AppLoggerService,

    private configService: ConfigService,

    private reflector: Reflector,

    private userService: UserService,

    @Inject("SUPABASE_CLIENT")
    private readonly supabase: SupabaseClient
  ) {}

  async validateRequest(
    context: ExecutionContext
  ) {

    const token =
      this.extractToken(context);

    return this.authenticate(
      context,
      token
    );
  }

  private async authenticate(
    context: ExecutionContext,
    token: string
  ) {

    try {

      const { data, error } =
        await this.supabase.auth.getUser(
          token
        );

      if (error || !data?.user) {
        throw new UnauthorizedException(
          "Invalid token"
        );
      }

      const supabaseUser = data.user;

      // 🔥 leer metadata del decorator
      const acceptInvitation =
        this.reflector.getAllAndOverride<boolean>(
          ACCEPT_INVITATION_KEY,
          [
            context.getHandler(),
            context.getClass(),
          ]
        );

      // 🔥 flujo especial accept invitation
      if (acceptInvitation) {

        const authContext = {
          supabaseId: supabaseUser.id,
          email: supabaseUser.email,
          provider: "supabase",
        };

        this.attachToRequest(
          context,
          authContext
        );

        return authContext;
      }

      // 🔥 auth normal
      const user =
        await this.userService.findUnique(
          supabaseUser.id
        );

      if (!user) {
        throw new UserNotFoundError();
      }

      const authContext = {
        userId: user.id,
        email: user.email,
        role: user.role,
        provider: "supabase",
      };

      this.attachToRequest(
        context,
        authContext
      );

      return authContext;

    } catch (error: any) {

      this.logger.info(
        "unauthorized",
        {
          error: error?.message,
        }
      );

      throw new UnauthorizedException(
        error?.message || "unauthorized"
      );
    }
  }

  private extractToken(
    context: ExecutionContext
  ): string {

    const req =
      context.switchToHttp().getRequest();

    const header =
      req.headers["authorization"];

    if (!header) {
      throw new UnauthorizedException(
        "Missing Authorization header"
      );
    }

    const [_type, token] =
      header.split(" ");

    if (!token) {
      throw new UnauthorizedException(
        "Missing token"
      );
    }

    return token;
  }

  private attachToRequest(
    context: ExecutionContext,
    authContext: any
  ) {

    const req =
      context.switchToHttp().getRequest();

    req.user = authContext;
  }
}