/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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
  async generatePath(@Body() body: { goal: string }) {
    const { goal } = body;
    const steps = await this.openaiService.generateHFSteps(goal);
    return steps;
  }

  @Post('/start')
  @UseGuards(ClerkAuthGuard)
  async startPath(@Body() body: any, @Req() req: Request & { user?: any }) {
    const { title, steps } = body;
    const path = await this.learningPathService.createPath(
      title as string,
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

  @Post('/mark-done')
  @UseGuards(ClerkAuthGuard)
  async MarkDone(
    @Body()
    body: any,
    @Req() req: Request & { user?: any },
  ) {
    console.log(body);
    const { learningPathId, stepIndex, status } = body;
    return this.learningPathService.UpdateStatus(
      req.user.sub as string,
      learningPathId as string,
      stepIndex as number,
      status as 'pending' | 'done',
    );
  }

  @Delete('/delete/:id')
  @UseGuards(ClerkAuthGuard)
  async DeletePATH(@Param('id') id: string) {
    return this.learningPathService.DeletePath(id);
  }
}
