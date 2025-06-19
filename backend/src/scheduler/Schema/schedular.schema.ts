import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type SchedulerDocument = Scheduler & Document;

@Schema({ timestamps: true })
export class Scheduler {
  @Prop({ type: Types.ObjectId, ref: 'LearningPath', required: true })
  learningPath: Types.ObjectId;

  @Prop({ type: Date, default: null })
  reminderTime: Date;
}

export const SchedulerSchema = SchemaFactory.createForClass(Scheduler);
