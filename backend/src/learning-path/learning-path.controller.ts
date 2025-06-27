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

  @Post()
  @UseGuards(ClerkAuthGuard)
  async generatePath(
    @Body() body: { goal: string },
    @Req() req: Request & { user?: any },
  ) {
    const { goal } = body;
    const title = goal;
    const steps = await this.openaiService.generateHFSteps(goal);
    const path = await this.learningPathService.createPath(
      title,
      steps,
      req.user.sub as string,
    );
    return path;
  }

  @UseGuards(ClerkAuthGuard)
  @Get()
  async getAllPaths(@Req() req: Request & { user?: any }) {
    const data = await this.learningPathService.GetUsersPath(
      req.user.sub as string,
    );
    return data;
  }

  @Get('/path')
  @UseGuards(ClerkAuthGuard)
  async GetParticular(@Body('id') id: string) {
    return this.learningPathService.GetUsersParticularPath(id);
  }
}
