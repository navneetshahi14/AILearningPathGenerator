import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Scheduler, SchedulerDocument } from './Schema/schedular.schema';
import { Model } from 'mongoose';
import { LearningPathDocument } from 'src/learning-path/Schema/learning-path.schema';
import { Cron } from '@nestjs/schedule';
import moment from 'moment';
import { MailService } from 'src/common/mail/mail.service';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectModel(Scheduler.name)
    private scheduler: Model<SchedulerDocument>,
    private readonly mailService: MailService,
  ) {}

  async setReminder(learningPathId: string, reminderTime: Date) {
    return this.scheduler.create({
      learningPath: learningPathId,
      reminderTime,
    });
  }

  @Cron('0 9 * * *')
  async sendReminder() {
    const now = moment();
    const todayStart = moment(now).startOf('day').toDate();
    const todayEnd = moment(now).endOf('day').toDate();

    const schedulers = await this.scheduler
      .find({
        reminderTime: { $gte: todayStart, $lte: todayEnd },
      })
      .populate({
        path: 'learningPath',
        populate: {
          path: 'createdBy',
          model: 'User',
        },
      });

    for (const schedule of schedulers) {
      const learnPath =
        schedule.learningPath as unknown as LearningPathDocument & {
          createdBy: {
            email: string;
          };
        };

      if (learnPath.status !== 'done') {
        const userEmail = learnPath?.createdBy.email;

        await this.mailService.sendMail(
          userEmail,
          '🔔 SkillRoute Daily Reminder',
          `Today's Task: ${learnPath.title}\nEstimated Duration: ${learnPath.estimationDuration}`,
        );
      }
    }
  }
}
