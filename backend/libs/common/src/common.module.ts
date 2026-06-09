import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { UserModule } from '../modules/user/user.module';
import { DatabaseModule } from '../database/database.module';
import { AppLoggerService } from './appLogger/appLogger.service';
import { UserInvitationModule } from '../modules/invitation-user/user-invitation.module';
import { ReportModule } from '../modules/report/report.module';

@Global()
@Module({
  imports: [DatabaseModule, UserModule, UserInvitationModule, ReportModule],
  providers: [CommonService, AppLoggerService],
  exports: [CommonService, DatabaseModule, UserModule, AppLoggerService, UserInvitationModule, ReportModule],
})
export class CommonModule { }
