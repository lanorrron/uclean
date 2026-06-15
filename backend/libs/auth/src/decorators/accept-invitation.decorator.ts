// accept-invitation.decorator.ts

import { SetMetadata } from "@nestjs/common";

export const ACCEPT_INVITATION_KEY =
  "accept_invitation";

export const AcceptInvitationAuth = () =>
  SetMetadata(ACCEPT_INVITATION_KEY, true);