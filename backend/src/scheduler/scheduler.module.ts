import { Module } from '@nestjs/common';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Scheduler, SchedulerSchema } from './Schema/schedular.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Scheduler.name,
        schema: SchedulerSchema,
      },
    ]),
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService],
})
export class SchedulerModule {}
