import { forwardRef, Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProgress, UserProgressSchema } from './Schema/progress.schema';
import { LearningPathModule } from 'src/learning-path/learning-path.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserProgress.name,
        schema: UserProgressSchema,
      },
    ]),
    forwardRef(() => LearningPathModule),
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService, MongooseModule],
})
export class ProgressModule {}
