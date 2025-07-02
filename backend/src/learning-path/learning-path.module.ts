import { forwardRef, Module } from '@nestjs/common';
import { LearningPathController } from './learning-path.controller';
import { LearningPathService } from './learning-path.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LearningPath,
  LearningPathSchema,
} from './Schema/learning-path.schema';
import { ProgressService } from 'src/progess/progress.service';
import { ProgressModule } from 'src/progess/progress.module';
import { OpenAiModule } from 'src/common/openAi/openai.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LearningPath.name,
        schema: LearningPathSchema,
      },
    ]),
    forwardRef(() => ProgressModule),
    forwardRef(() => OpenAiModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [LearningPathController],
  providers: [LearningPathService, ProgressService],
  exports: [LearningPathService, MongooseModule],
})
export class LearningPathModule {}
