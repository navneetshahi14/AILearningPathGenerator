export const learningPathPrompt = (goal: string) =>
  `You are an expert learning coach.

A user wants to achieve the following goal: "${goal}"

Generate a structured learning path that includes:
1. A series of actionable learning steps
2. An estimated time to complete **each step** (in days or weeks)
3. Keep steps short and practical
4. Format the response as a numbered list like this:

Example:

1. **Learn HTML and CSS** — 1 week  
2. **Understand JavaScript basics** — 2 weeks  
3. **Explore DOM manipulation and events** — 3 days  
4. **Learn Git and GitHub** — 2 days  
5. **Build 2-3 static websites** — 1 week
6. Total EstimatedDays = 20 days

DO NOT include introduction or conclusion.
  `;
