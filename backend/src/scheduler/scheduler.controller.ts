import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ClerkAuthGuard } from 'src/common/guards/clerk-auth.guard';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Post('reminder/:learningPathId')
  @UseGuards(ClerkAuthGuard)
  async setReminder(
    @Param('learningPathId') learningPathId: string,
    @Body('reminderTime') reminderTime: string,
  ) {
    const reminderDate = new Date(reminderTime);
    return this.schedulerService.setReminder(learningPathId, reminderDate);
  }

  @Get('send-reminder')
  async sendReminder() {
    return this.schedulerService.sendReminder();
  }
}
