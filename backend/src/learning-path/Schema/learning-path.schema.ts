import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class LearningPath {
  @Prop({ required: true })
  title: string;

  @Prop([
    {
      title: String,
      status: {
        type: String,
        enum: ['pending', 'done'],
        default: 'pending',
      },
      completedAt: { type: Date, default: null },
    },
  ])
  steps: {
    title: string;
    status: 'pending' | 'done';
    completedAt?: Date;
  }[];

  @Prop()
  estimationDuration: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'done';

  @Prop({ ref: 'User', required: true, type: String })
  createdBy: string;
}

export type LearningPathDocument = LearningPath & Document;
export const LearningPathSchema = SchemaFactory.createForClass(LearningPath);
