import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningPathModule } from './learning-path/learning-path.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from './common/mail/mail.module';
import { ProgressModule } from './progess/progress.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/SkillRoute'),
    ScheduleModule.forRoot(),
    AuthModule,
    LearningPathModule,
    SchedulerModule,
    MailModule,
    ProgressModule,
  ],
})
export class AppModule {}
