/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClerkAuthGuard } from 'src/common/guards/clerk-auth.guard';

interface userData {
  user: {
    clerkUserId: string;
    name: string;
    email: string;
    imageUrl: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(ClerkAuthGuard)
  async checkUser(
    @Body('clerkUserId') clerkUserId: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('imageUrl') imageUrl: string,
  ) {
    const userdetails = {
      clerkUserId,
      name,
      email,
      imageUrl,
    };
    const user = await this.authService.findorCreate(userdetails);

    return { message: 'User Verified and Stored', user };
  }
}
