import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LearningPathDocument = LearningPath & Document;

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

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const LearningPathSchema = SchemaFactory.createForClass(LearningPath);
