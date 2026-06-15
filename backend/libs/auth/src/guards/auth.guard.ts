import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { Reflector } from "@nestjs/core";

import { AUTH_METADATA }
from "../decorators/auth.decorator";

import { AuthService }
from "../auth.service";

import { Role } from "@prisma/client";

@Injectable()
export class AuthGuard
implements CanActivate {

  constructor(
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {

    const handler =
      context.getHandler();

    const controller =
      context.getClass();

    const isPublic =
      this.reflector.get<boolean>(
        AUTH_METADATA.PUBLIC,
        handler,
      );

    if (isPublic) {
      return true;
    }

    const auth =
      await this.authService
        .validateRequest(context);

    if (!auth) {
      throw new UnauthorizedException(
        "Unauthorized"
      );
    }

    const requireRoles =
      this.reflector.getAllAndOverride<Role[]>(
        AUTH_METADATA.ROLES,
        [handler, controller],
      );

    if (requireRoles?.length) {

      if (!("role" in auth)) {

        throw new ForbiddenException(
          "User has no roles"
        );
      }

      const hasRole =
        requireRoles.includes(auth.role);

      if (!hasRole) {

        throw new ForbiddenException(
          "Not authorized"
        );
      }
    }

    const req =
      context.switchToHttp().getRequest();

    req.user = auth;

    return true;
  }
}