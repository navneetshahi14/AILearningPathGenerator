import { Module } from '@nestjs/common';
import { LearningPathController } from './learning-path.controller';
import { LearningPathService } from './learning-path.service';

@Module({
  controllers: [LearningPathController],
  providers: [LearningPathService],
})
export class LearningPathModule {}
