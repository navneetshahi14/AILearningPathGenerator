import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { learningPathPrompt } from '../prompt/learning_path.prompt';
import { HumanMessage } from '@langchain/core/messages';

function parseSteps(response: string): {
  title: string;
  status: 'pending';
  completedAt: Date | null;
}[] {
  const lines = response
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^\d+\.\s+\*\*/.test(line)); // Only lines starting with "1. **"

  const steps = lines.map((line) => {
    // Example line: "1. **Learn HTML and CSS** — 1 week"
    const match = line.match(/\*\*(.+?)\*\*\s+—\s+(.+)/);

    if (!match) return null;

    const title = `${match[1]} — ${match[2]}`;

    return {
      title,
      status: 'pending' as const,
      completedAt: null,
    };
  });

  return steps.filter((s): s is NonNullable<typeof s> => s !== null);
}

@Injectable()
export class OpenAiService {
  private readonly model = new ChatOpenAI({
    temperature: 0.7,
    model: 'gpt-4',
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  async generateSteps(goal: string): Promise<
    {
      title: string;
      status: 'pending';
      completedAt: Date | null;
    }[]
  > {
    const res = await this.model.invoke([
      new HumanMessage(learningPathPrompt(goal)),
    ]);

    const output = res.content as string;

    const steps = parseSteps(output);

    return steps;
  }
}
