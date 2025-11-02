'use server';

/**
 * @fileOverview Implements an AI-powered skill assessment flow.
 *
 * - adaptiveSkillAssessment - Assesses user skills and recommends roles/pathways.
 * - AdaptiveSkillAssessmentInput - The input type for the adaptiveSkillAssessment function.
 * - AdaptiveSkillAssessmentOutput - The return type for the adaptiveSkillAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveSkillAssessmentInputSchema = z.object({
  userSkills: z
    .string()
    .describe('A comma separated list of skills the user possesses.'),
  userInterests: z
    .string()
    .describe('A comma separated list of the users interests.'),
});
export type AdaptiveSkillAssessmentInput = z.infer<typeof AdaptiveSkillAssessmentInputSchema>;

const AdaptiveSkillAssessmentOutputSchema = z.object({
  recommendedRoles: z
    .string()
    .describe('A comma separated list of recommended roles for the user.'),
  recommendedPathways: z
    .string()
    .describe('A comma separated list of recommended pathways for the user.'),
  rationale: z.string().describe('The rationale behind the recommendations.'),
});
export type AdaptiveSkillAssessmentOutput = z.infer<typeof AdaptiveSkillAssessmentOutputSchema>;

export async function adaptiveSkillAssessment(input: AdaptiveSkillAssessmentInput): Promise<AdaptiveSkillAssessmentOutput> {
  return adaptiveSkillAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptiveSkillAssessmentPrompt',
  input: {schema: AdaptiveSkillAssessmentInputSchema},
  output: {schema: AdaptiveSkillAssessmentOutputSchema},
  prompt: `You are an AI career advisor specializing in virtual internships.

You will assess the user's skills and interests and recommend suitable roles and pathways within the virtual internship platform.

User Skills: {{{userSkills}}}
User Interests: {{{userInterests}}}

Based on the user's skills and interests, recommend roles and pathways that align with their profile. Provide a rationale for your recommendations.

Output the roles, pathways, and rationale in the following format:

Recommended Roles: [comma separated list of roles]
Recommended Pathways: [comma separated list of pathways]
Rationale: [rationale for the recommendations]`,
});

const adaptiveSkillAssessmentFlow = ai.defineFlow(
  {
    name: 'adaptiveSkillAssessmentFlow',
    inputSchema: AdaptiveSkillAssessmentInputSchema,
    outputSchema: AdaptiveSkillAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
