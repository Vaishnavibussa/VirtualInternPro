'use server';

/**
 * @fileOverview An AI agent that evaluates code and provides feedback.
 *
 * - evaluateCode - Analyzes a code snippet and gives feedback.
 * - EvaluateCodeInput - The input type for the evaluateCode function.
 * - EvaluateCodeOutput - The return type for the evaluateCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateCodeInputSchema = z.object({
  codeSnippet: z.string().describe('The block of code to be evaluated.'),
  language: z.string().describe('The programming language of the code (e.g., "typescript").'),
});
export type EvaluateCodeInput = z.infer<typeof EvaluateCodeInputSchema>;

const EvaluateCodeOutputSchema = z.object({
  staticAnalysisFeedback: z.string().describe('Feedback on code style, syntax, and potential bugs without running it.'),
  dynamicBehaviorSuggestion: z.string().describe('Suggestions on potential runtime issues, performance, and edge cases.'),
  peerBenchmarkComparison: z.string().describe('A qualitative comparison against best practices and common patterns for this type of code.'),
});
export type EvaluateCodeOutput = z.infer<typeof EvaluateCodeOutputSchema>;

export async function evaluateCode(
  input: EvaluateCodeInput
): Promise<EvaluateCodeOutput> {
  return evaluatorAgentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'evaluatorAgentPrompt',
  input: {schema: EvaluateCodeInputSchema},
  output: {schema: EvaluateCodeOutputSchema},
  prompt: `You are an expert AI code evaluator. Your task is to analyze a code snippet and provide comprehensive feedback.

  CODE SNIPPET (language: {{{language}}}):
  \`\`\`
  {{{codeSnippet}}}
  \`\`\`

  EVALUATION:
  1.  **Static Analysis**: Review the code for style, syntax errors, and anti-patterns. Provide clear feedback.
  2.  **Dynamic Behavior**: Infer potential runtime behavior. Suggest improvements for performance, error handling, and edge cases.
  3.  **Peer Benchmarking**: Compare the code to industry best practices and common patterns. Explain how it aligns or where it could be improved to meet professional standards.

  Provide your evaluation in the required JSON format.`,
});

const evaluatorAgentFlow = ai.defineFlow(
  {
    name: 'evaluatorAgentFlow',
    inputSchema: EvaluateCodeInputSchema,
    outputSchema: EvaluateCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
