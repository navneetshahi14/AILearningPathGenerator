import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import {
  LearningPath,
  LearningPathDocument,
} from 'src/learning-path/Schema/learning-path.schema';
import { UserProgress, UserProgressDocument } from './Schema/progress.schema';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(UserProgress.name)
    private progressModel: Model<UserProgressDocument>,
    @InjectModel(LearningPath.name)
    private learningPathModel: Model<LearningPathDocument>,
  ) {}

  async rewardUser(userId: string, xpEarned = 10) {
    const today = moment().startOf('day').toDate();
    const yesterday = moment().subtract(1, 'day').startOf('day').toDate();

    const progress = await this.progressModel.findOneAndUpdate(
      { user: userId },
      { $setOnInsert: { user: userId } },
      { upsert: true, new: true },
    );

    progress.xp += xpEarned;

    const xpForNextLevel = progress.level * 100;
    if (progress.xp >= xpForNextLevel) {
      progress.level += 1;
      progress.badge.push(`🎉 Leveled up to ${progress.level}`);
    }

    if (progress.lastActivity) {
      const last = moment(progress.lastActivity).startOf('day').toDate();
      if (last.getTime() === yesterday.getTime()) {
        progress.currentStreak += 1;
      } else if (last.getTime() === today.getTime()) {
        progress.currentStreak = 1;
      }
    } else {
      progress.currentStreak = 1;
    }

    if (progress.currentStreak > progress.longestStreak) {
      progress.longestStreak = progress.currentStreak;
    }

    progress.lastActivity = today;
    return progress.save();
  }

  async getProgressforpath(id: string) {
    const path = await this.learningPathModel.findById(id);

    if (!path) throw new NotFoundException('Learning Path not found');

    const total = path.steps.length;
    const completed = path.steps.filter((s) => s.status === 'done').length;
    const progressPercentage = Math.round((completed / total) * 100);

    return {
      title: path.title,
      progressPercentage,
      totalSteps: total,
      completedSteps: completed,
      pendingSteps: total - completed,
    };
  }

  async getProgress(id: string) {
    return this.progressModel.find({ user: id });
  }
}
