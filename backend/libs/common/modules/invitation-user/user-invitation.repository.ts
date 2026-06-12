import { Injectable } from "@nestjs/common";

import { InvitationStatus, Role } from  '@prisma/client';
import { DatabaseService } from "libs/common/database/database.service";

@Injectable()
export class UserInvitationRepository {
  constructor(private readonly db: DatabaseService) {}

  findPendingByEmail(email: string) {
    return this.db.userInvitation.findUnique({
      where: { email },
    });
  }

  create(data: { email: string; role: Role }) {
    return this.db.userInvitation.create({
      data: {
        ...data,
        status: InvitationStatus.PENDING,
      },
    });
  }

  markAccepted(id: string) {
    return this.db.userInvitation.update({
      where: { id },
      data: { status: InvitationStatus.ACCEPTED },
    });
  }

  cancel(id: string) {
    return this.db.userInvitation.update({
      where: { id },
      data: { status: InvitationStatus.DECLINED, deleted_at: new Date() },
    });
  }

  isValid(email: string) {
    return this.db.userInvitation.findFirst({
      where: {
        email,
        status: InvitationStatus.PENDING,
      },
    });
  }
  listInvitations() {
    return this.db.userInvitation.findMany({
      where: {
        status: InvitationStatus.PENDING,
      },
    });
  }
}