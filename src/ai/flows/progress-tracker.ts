'use server';

/**
 * @fileOverview An AI agent that tracks performance and recommends interventions.
 *
 * - trackProgress - Analyzes daily performance and recommends learning.
 * - TrackProgressInput - The input type for the trackProgress function.
 * - TrackProgressOutput - The return type for the trackProgress function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrackProgressInputSchema = z.object({
  dailyPerformanceData: z.object({
    tasksCompleted: z.number(),
    commits: z.number(),
    activeHours: z.number(),
    codeQualityScore: z.number().describe('A score from 0 to 100.'),
  }),
  engagementMetrics: z.object({
    mentorSessionsAttended: z.number(),
    questionsAsked: z.number(),
  }),
  historicalPerformance: z.string().describe('A summary of performance over the last few weeks.'),
});
export type TrackProgressInput = z.infer<typeof TrackProgressInputSchema>;

const TrackProgressOutputSchema = z.object({
  performanceSummary: z.string().describe('A brief, encouraging summary of the day\'s performance.'),
  learningRecommendation: z.string().describe('A targeted recommendation for a skill or topic to learn next.'),
  recommendedResourceLink: z.string().describe('A URL to an article, video, or course for the recommended learning topic.'),
});
export type TrackProgressOutput = z.infer<typeof TrackProgressOutputSchema>;

export async function trackProgress(
  input: TrackProgressInput
): Promise<TrackProgressOutput> {
  return progressTrackerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'progressTrackerPrompt',
  input: {schema: TrackProgressInputSchema},
  output: {schema: TrackProgressOutputSchema},
  prompt: `You are an AI Progress Tracker for virtual interns. Your job is to analyze daily performance and engagement data to provide a summary and a targeted learning intervention.

  DATA FOR TODAY:
  - Performance: {{{json dailyPerformanceData}}}
  - Engagement: {{{json engagementMetrics}}}
  - Historical Context: {{{historicalPerformance}}}

  YOUR TASK:
  1.  Write a brief, positive summary of today's achievements.
  2.  Based on all the data, identify a single, high-impact area for improvement.
  3.  Recommend a specific skill or topic to focus on.
  4.  Provide a link to a high-quality resource (article, tutorial, etc.) for that topic.`,
});

const progressTrackerFlow = ai.defineFlow(
  {
    name: 'progressTrackerFlow',
    inputSchema: TrackProgressInputSchema,
    outputSchema: TrackProgressOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
