import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Scheduler, SchedulerDocument } from './Schema/schedular.schema';
import { Model } from 'mongoose';
import { LearningPathDocument } from 'src/learning-path/Schema/learning-path.schema';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';
import { MailService } from 'src/common/mail/mail.service';
// import { User, UserDocument } from 'src/auth/Schema/user.schema';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectModel(Scheduler.name)
    private scheduler: Model<SchedulerDocument>,
    private readonly mailService: MailService,
    // @InjectModel(User.name)
    // private userMail: Model<UserDocument>,
  ) {}

  async setReminder(learningPathId: string, reminderTime: Date) {
    const findTimer = await this.scheduler.findOne({
      learningPath: learningPathId,
    });
    if (!findTimer) {
      return this.scheduler.create({
        learningPath: learningPathId,
        reminderTime,
      });
    }

    return this.scheduler.findByIdAndUpdate(
      findTimer._id,
      {
        reminderTime,
      },
      { new: true },
    );
  }

  @Cron('* * * * *')
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
      const learnPath = schedule.learningPath as unknown as
        | (LearningPathDocument & {
            createdBy: {
              email: string;
            };
          })
        | null;

      if (learnPath && learnPath.createdBy && learnPath.status !== 'done') {
        const userEmail = learnPath.createdBy.email;

        if (userEmail) {
          await this.mailService.sendMail(
            userEmail,
            '🔔 SkillRoute Daily Reminder',
            `Today's Task: ${learnPath.title}\nEstimated Duration: ${learnPath.estimationDuration}`,
          );
        }
      }
    }
  }
}
