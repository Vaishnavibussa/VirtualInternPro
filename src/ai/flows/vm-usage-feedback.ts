'use server';

/**
 * @fileOverview An AI agent that provides helpful suggestions or alerts based on VM usage data.
 *
 * - getVmUsageFeedback - A function that retrieves VM usage feedback.
 * - VmUsageFeedbackInput - The input type for the getVmUsageFeedback function.
 * - VmUsageFeedbackOutput - The return type for the getVmUsageFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VmUsageFeedbackInputSchema = z.object({
  usageData: z
    .string()
    .describe(
      'A string containing the VM usage data, including CPU usage, memory usage, disk I/O, and network traffic.'
    ),
  studentId: z.string().describe('The ID of the student using the VM.'),
  projectId: z.string().describe('The ID of the project the student is working on.'),
});
export type VmUsageFeedbackInput = z.infer<typeof VmUsageFeedbackInputSchema>;

const VmUsageFeedbackOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of helpful suggestions or alerts based on the VM usage data.'),
});
export type VmUsageFeedbackOutput = z.infer<typeof VmUsageFeedbackOutputSchema>;

export async function getVmUsageFeedback(input: VmUsageFeedbackInput): Promise<VmUsageFeedbackOutput> {
  return vmUsageFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'vmUsageFeedbackPrompt',
  input: {schema: VmUsageFeedbackInputSchema},
  output: {schema: VmUsageFeedbackOutputSchema},
  prompt: `You are an AI assistant that provides helpful suggestions and alerts to students based on their virtual machine usage data.

You will receive VM usage data, student ID, and project ID as input. Analyze the usage data and provide specific, actionable suggestions to help the student optimize their work and improve their project outcomes.

Consider factors such as CPU usage, memory usage, disk I/O, and network traffic. If you notice any potential issues or areas for improvement, generate suggestions or alerts accordingly.

Example suggestions:
* "Consider optimizing your code to reduce CPU usage."
* "You may need to allocate more memory to the VM."
* "Check your network configuration for potential bottlenecks."

Usage Data: {{{usageData}}}
Student ID: {{{studentId}}}
Project ID: {{{projectId}}}`,
});

const vmUsageFeedbackFlow = ai.defineFlow(
  {
    name: 'vmUsageFeedbackFlow',
    inputSchema: VmUsageFeedbackInputSchema,
    outputSchema: VmUsageFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
