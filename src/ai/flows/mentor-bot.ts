'use server';

/**
 * @fileOverview An AI mentor bot that provides contextual help.
 *
 * - getMentorship - Provides hints, debugging support, and resources.
 * - GetMentorshipInput - The input type for the getMentorship function.
 * - GetMentorshipOutput - The return type for the getMentorship function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetMentorshipInputSchema = z.object({
  codeContext: z.string().describe('The code the user is currently working on.'),
  userQuestion: z.string().describe('The specific question or problem the user is facing.'),
  taskDescription: z.string().describe('The description of the task the user is trying to complete.'),
});
export type GetMentorshipInput = z.infer<typeof GetMentorshipInputSchema>;

const GetMentorshipOutputSchema = z.object({
  contextualHint: z.string().describe('A direct hint to help the user solve their immediate problem.'),
  debuggingSuggestion: z.string().describe('A specific suggestion on how to debug the issue.'),
  bestPracticeTip: z.string().describe('A relevant best practice or coding convention.'),
  documentationLink: z.string().describe('A URL to relevant documentation (e.g., MDN, official library docs).'),
});
export type GetMentorshipOutput = z.infer<typeof GetMentorshipOutputSchema>;

export async function getMentorship(
  input: GetMentorshipInput
): Promise<GetMentorshipOutput> {
  return mentorBotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mentorBotPrompt',
  input: {schema: GetMentorshipInputSchema},
  output: {schema: GetMentorshipOutputSchema},
  prompt: `You are an AI Mentor Bot. Your goal is to provide helpful, contextual guidance to an intern.

  INTERN'S CONTEXT:
  - Current Task: {{{taskDescription}}}
  - Their Question: "{{{userQuestion}}}"
  - Their Code:
  \`\`\`
  {{{codeContext}}}
  \`\`\`

  YOUR TASK:
  Provide assistance by generating:
  1.  **Contextual Hint**: A small, direct hint to unblock them.
  2.  **Debugging Suggestion**: A practical step they can take to debug.
  3.  **Best Practice Tip**: A relevant best practice to improve their code.
  4.  **Documentation Link**: A highly relevant URL to official documentation.

  Be encouraging and supportive.`,
});

const mentorBotFlow = ai.defineFlow(
  {
    name: 'mentorBotFlow',
    inputSchema: GetMentorshipInputSchema,
    outputSchema: GetMentorshipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
