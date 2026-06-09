import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { Reflector } from "@nestjs/core";

import { AUTH_METADATA } from "../decorators/auth.decorator";
import { AuthService } from "../auth.service";
import { Role } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();
    const controller = context.getClass();

    // 1. Public
    const isPublic = this.reflector.get<boolean>(
      AUTH_METADATA.PUBLIC,
      handler,
    );

    if (isPublic) return true;

    // 2. Auth
    const auth = await this.authService.validateRequest(context);

    if (!auth) {
      throw new UnauthorizedException("Unauthorized");
    }

    // 3. Roles
    const requireRoles = this.reflector.getAllAndOverride<Role[]>(
      AUTH_METADATA.ROLES,
      [handler, controller],
    );

    if (requireRoles?.length) {
      const hasRole = requireRoles.includes(auth.role);

      if (!hasRole) {
        throw new ForbiddenException("Not authorized");
      }
    }

    // 4. attach user
    const req = context.switchToHttp().getRequest();
    req.user = auth;

    return true;
  }
}