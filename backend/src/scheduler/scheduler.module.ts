import { forwardRef, Module } from '@nestjs/common';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Scheduler, SchedulerSchema } from './Schema/schedular.schema';
import { MailModule } from 'src/common/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Scheduler.name,
        schema: SchedulerSchema,
      },
    ]),
    forwardRef(() => MailModule),
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService],
  exports: [SchedulerService, MongooseModule],
})
export class SchedulerModule {}
