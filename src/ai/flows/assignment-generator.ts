'use server';

/**
 * @fileOverview Creates role-based, adaptive, real-world project tasks.
 *
 * - generateAssignment - Creates a new task for a user.
 * - GenerateAssignmentInput - The input type for the generateAssignment function.
 * - GenerateAssignmentOutput - The return type for the generateAssignment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAssignmentInputSchema = z.object({
  role: z.string().describe('The role of the user (e.g., Developer, PM).'),
  currentSkills: z.array(z.string()).describe('The current skills of the user.'),
  pastPerformance: z.string().describe('A summary of the user\'s past performance.'),
});
export type GenerateAssignmentInput = z.infer<
  typeof GenerateAssignmentInputSchema
>;

const GenerateAssignmentOutputSchema = z.object({
  taskTitle: z.string().describe('The title of the generated task.'),
  taskDescription: z
    .string()
    .describe('A detailed description of the real-world project task.'),
  difficulty: z
    .enum(['Beginner', 'Intermediate', 'Advanced'])
    .describe('The assessed difficulty of the task.'),
  requiredSkills: z
    .array(z.string())
    .describe('A list of skills required to complete the task.'),
});
export type GenerateAssignmentOutput = z.infer<
  typeof GenerateAssignmentOutputSchema
>;

export async function generateAssignment(
  input: GenerateAssignmentInput
): Promise<GenerateAssignmentOutput> {
  return assignmentGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assignmentGeneratorPrompt',
  input: {schema: GenerateAssignmentInputSchema},
  output: {schema: GenerateAssignmentOutputSchema},
  prompt: `You are an AI expert at creating role-based, adaptive, and progressively challenging project tasks for virtual interns.

  CONTEXT:
  - User Role: {{{role}}}
  - User's Current Skills: {{{json currentSkills}}}
  - User's Past Performance Summary: {{{pastPerformance}}}

  TASK:
  Based on the user's context, generate a single, new, real-world project task.
  The task should be slightly more challenging than their past performance suggests to encourage growth.
  Define a clear title, a comprehensive description, the difficulty, and the skills required.
  `,
});

const assignmentGeneratorFlow = ai.defineFlow(
  {
    name: 'assignmentGeneratorFlow',
    inputSchema: GenerateAssignmentInputSchema,
    outputSchema: GenerateAssignmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
