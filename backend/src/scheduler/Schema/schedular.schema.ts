import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ timestamps: true })
export class Scheduler {
  @Prop({ type: Types.ObjectId, ref: 'LearningPath', required: true })
  learningPath: Types.ObjectId;

  @Prop({ type: Date, default: null })
  reminderTime: Date;
}

export type SchedulerDocument = Scheduler & Document;
export const SchedulerSchema = SchemaFactory.createForClass(Scheduler);
