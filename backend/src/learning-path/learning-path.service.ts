import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  LearningPath,
  LearningPathDocument,
} from './Schema/learning-path.schema';
import { Model } from 'mongoose';
import moment from 'moment';

@Injectable()
export class LearningPathService {
  constructor(
    @InjectModel(LearningPath.name)
    private learningPath: Model<LearningPathDocument>,
  ) {}

  async createPath(
    title: string,
    steps: string[],
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
    learningPathId: string,
    stepIndex: number,
    status: 'pending' | 'done',
  ) {
    const path = await this.learningPath.findById(learningPathId);
    if (!path || !path.steps[stepIndex]) return null;

    path.steps[stepIndex].status = status;
    path.steps[stepIndex].completedAt = moment().toDate();
    return path.save();
  }
}
