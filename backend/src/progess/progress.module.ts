import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProgress, UserProgressSchema } from './Schema/progress.schema';
import {
  LearningPath,
  LearningPathSchema,
} from 'src/learning-path/Schema/learning-path.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserProgress.name,
        schema: UserProgressSchema,
      },
      {
        name: LearningPath.name,
        schema: LearningPathSchema,
      },
    ]),
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
