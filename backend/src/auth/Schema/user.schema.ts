import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  clerkUserId: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  imageUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
