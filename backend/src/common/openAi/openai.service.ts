import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { learningPathPrompt } from '../prompt/learning_path.prompt';
import { HumanMessage } from '@langchain/core/messages';

@Injectable()
export class OpenAiService {
  private readonly model = new ChatOpenAI({
    temperature: 0.7,
    model: 'gpt-4',
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  async generateSteps(goal: string): Promise<string[]> {
    const res = await this.model.invoke([
      new HumanMessage(learningPathPrompt(goal)),
    ]);

    const output = res.content as string;

    const steps = output
      .split('\n')
      .map((line) => line.replace(/^\d+[\\.\\)]?\s*/, '').trim())
      .filter((line) => line.length > 0);

    return steps;
  }
}
