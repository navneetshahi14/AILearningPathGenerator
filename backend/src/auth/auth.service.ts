/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './Schema/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findorCreate(clerkUserData: any) {
    try {
      const { clerkUserId, name, email, imageUrl } = clerkUserData;

      let user = await this.userModel.findOne({ clerkUserId });

      if (!user) {
        user = await this.userModel.create({
          clerkUserId,
          name,
          email,
          imageUrl,
        });
      }

      return user;
    } catch (err) {
      console.error(err);
    }
  }
}
