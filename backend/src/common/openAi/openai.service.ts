import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { learningPathPrompt } from '../prompt/learning_path.prompt';
import { HumanMessage } from '@langchain/core/messages';
import { InferenceClient } from '@huggingface/inference';

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
    model: 'gpt-4o mini',
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  client = new InferenceClient(process.env.HUGGING_FACE_API);

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

  async generateHFSteps(goals: string): Promise<
    {
      title: string;
      status: 'pending';
      completedAt: Date | null;
    }[]
  > {
    const Hmessage = new HumanMessage(learningPathPrompt(goals));
    // const HF_API_TOKEN = process.env.HUGGING_FACE_API;
    // const MODEL = 'MiniMaxAI/MiniMax-M1-80k';
    // const response = await axios.post(
    //   `https://api-inference.huggingface.co/models/${MODEL}`,
    //   {
    //     inputs: Hmessage.content,
    //     parameters: {
    //       temperature: 0.7,
    //       max_new_tokens: 200,
    //     },
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${HF_API_TOKEN}`,
    //     },
    //   },
    // );
    // const output =
    //   (response.data[0].generated_text as string) || (response.data as string);
    // const steps = parseSteps(output);
    // return steps;

    const chatCompletion = await this.client.chatCompletion({
      provider: 'featherless-ai',
      model: 'mistralai/Magistral-Small-2506',
      messages: [
        {
          role: 'user',
          content: Hmessage.content as string,
        },
      ],
    });

    const output = chatCompletion.choices[0].message?.content;

    if (typeof output !== 'string') {
      console.error(
        'Unexpected response format from Hugging Face:',
        chatCompletion.choices[0].message,
      );
      throw new Error('Invalid response from Hugging Face model');
    }

    const steps = parseSteps(output);
    return steps;
  }
}
