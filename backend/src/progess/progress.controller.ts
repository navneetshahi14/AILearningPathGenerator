/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ClerkAuthGuard } from 'src/common/guards/clerk-auth.guard';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @UseGuards(ClerkAuthGuard)
  @Get('/path')
  async getProgressForPath(@Body('id') id: string) {
    return this.progressService.getProgressforpath(id);
  }

  @UseGuards(ClerkAuthGuard)
  @Get()
  async getProgress(
    @Body('id') id: string,
    @Req() req: Request & { user?: any },
  ) {
    return this.progressService.getProgress(req.user?.sub as string);
  }
}
