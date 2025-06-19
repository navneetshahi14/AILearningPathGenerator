import { Controller, Get, Req, UseGuards } from '@nestjs/common';
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

  @UseGuards(ClerkAuthGuard)
  @Get()
  async checkUser(@Req() req: userData) {
    console.log(req);
    const user = await this.authService.findorCreate(req.user);

    return { message: 'User Verified and Stored', user };
  }
}
