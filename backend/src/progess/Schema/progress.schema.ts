import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserProgressDocument = UserProgress & Document;

@Schema({ timestamps: true })
export class UserProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  user: Types.ObjectId;

  @Prop({ default: 0 })
  xp: number;

  @Prop({ default: 1 })
  level: number;

  @Prop({ default: 0 })
  currentStreak: number;

  @Prop({ default: 0 })
  longestStreak: number;

  @Prop({ default: [] })
  badge: string[];

  @Prop({ default: null })
  lastActivity: Date;
}

export const UserProgressSchema = SchemaFactory.createForClass(UserProgress);
