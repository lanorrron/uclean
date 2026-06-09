import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { DatabaseModule } from 'libs/common/database/database.module';
import { CommonModule } from '@app/common';
import { AuthModule } from '@app/auth';
import { UserInvitationController } from './controllers/Invitation/user-invitation.controller';
import { ReportController } from './controllers/report/report.controller';
import { UserController } from './controllers/user/user.controller';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CommonModule,
    DatabaseModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
    ]),
  ],

  controllers: [AppController, UserInvitationController, ReportController, UserController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }