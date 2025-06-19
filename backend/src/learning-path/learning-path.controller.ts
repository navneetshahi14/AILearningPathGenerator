/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LearningPathService } from './learning-path.service';
import { OpenAiService } from 'src/common/openAi/openai.service';
import { ClerkAuthGuard } from 'src/common/guards/clerk-auth.guard';

@Controller('learning')
export class LearningPathController {
  constructor(
    private readonly learningPathService: LearningPathService,
    private readonly openaiService: OpenAiService,
  ) {}

  @UseGuards(ClerkAuthGuard)
  @Post()
  async generatePath(@Body('goal') goal: string, @Req() req) {
    const steps = await this.openaiService.generateSteps(goal);
    const path = await this.learningPathService.createPath(
      goal,
      steps,
      req.user._id as string,
    );
    return path;
  }

  @UseGuards(ClerkAuthGuard)
  @Get()
  async getAllPaths(@Req() req) {
    return this.learningPathService.GetUsersPath(req.user._id);
  }

  @UseGuards(ClerkAuthGuard)
  @Get('/path')
  async GetParticular(@Body('id') id: string) {
    return this.learningPathService.GetUsersParticularPath(id);
  }
}
