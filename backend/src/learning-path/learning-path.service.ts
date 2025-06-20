import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  LearningPath,
  LearningPathDocument,
} from './Schema/learning-path.schema';
import { Model } from 'mongoose';
import moment from 'moment';
import { ProgressService } from 'src/progess/progress.service';

@Injectable()
export class LearningPathService {
  constructor(
    @InjectModel(LearningPath.name)
    private learningPath: Model<LearningPathDocument>,
    private progressService: ProgressService,
  ) {}

  async createPath(
    title: string,
    steps: {
      title: string;
      status: string;
      completedAt: Date | null;
    }[],
    userId: string,
    estimatedDuration?: string,
  ) {
    return this.learningPath.create({
      title,
      steps,
      estimatedDuration,
      createdBy: userId,
    });
  }

  async GetUsersPath(userId: string) {
    return this.learningPath
      .find({ createdBy: userId })
      .sort({ createdAt: -1 });
  }

  async GetUsersParticularPath(id: string) {
    return this.learningPath.findById(id);
  }

  async UpdateStatus(
    userId: string,
    learningPathId: string,
    stepIndex: number,
    status: 'pending' | 'done',
  ) {
    const path = await this.learningPath.findById(learningPathId);
    if (!path || !path.steps[stepIndex]) return null;

    path.steps[stepIndex].status = status;
    path.steps[stepIndex].completedAt = moment().toDate();
    await path.save();

    if (status === 'done') {
      await this.progressService.rewardUser(userId, 10);
    }

    return path;
  }
}
