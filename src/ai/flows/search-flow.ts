'use server';

/**
 * @fileOverview A real-time, AI-powered search agent.
 *
 * - search - A function that searches across documents, projects, and chats.
 * - SearchInput - The input type for the search function.
 * - SearchOutput - The return type for the search function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  FileText,
  FolderKanban,
  MessageSquare,
  Ticket,
  LucideIcon,
} from 'lucide-react';

const SearchInputSchema = z.object({
  query: z.string().describe('The user\'s search query.'),
});
export type SearchInput = z.infer<typeof SearchInputSchema>;

const SearchResultSchema = z.object({
  id: z.number(),
  type: z.enum(['Document', 'Project']),
  title: z.string(),
  path: z.string(),
});

const SearchOutputSchema = z.object({
  results: z
    .array(SearchResultSchema)
    .describe('An array of search results.'),
});
export type SearchOutput = z.infer<typeof SearchOutputSchema>;

// This is a mock data source. In a real app, you would fetch this from a database.
const mockData = [
  {
    id: 1,
    type: 'Document' as const,
    title: 'Software Requirements Specification',
    path: '/documents',
  },
  {
    id: 2,
    type: 'Project' as const,
    title: 'E-Learning Platform',
    path: '/projects/p1',
  },
  {
    id: 5,
    type: 'Document' as const,
    title: 'API Integration Guide',
    path: '/documents',
  },
];

export async function search(input: SearchInput): Promise<SearchOutput> {
  return searchFlow(input);
}

const searchTool = ai.defineTool(
  {
    name: 'searchDataSource',
    description: 'Searches the available data source for relevant results.',
    inputSchema: SearchInputSchema,
    outputSchema: SearchOutputSchema,
  },
  async input => {
    const filteredResults = input.query
      ? mockData.filter(result =>
          result.title.toLowerCase().includes(input.query.toLowerCase())
        )
      : [];
    return {results: filteredResults};
  }
);

const prompt = ai.definePrompt({
  name: 'searchPrompt',
  input: {schema: SearchInputSchema},
  output: {schema: SearchOutputSchema},
  tools: [searchTool],
  prompt: `You are a search assistant. Use the provided search tool to find relevant results for the user's query: {{{query}}}`,
});

const searchFlow = ai.defineFlow(
  {
    name: 'searchFlow',
    inputSchema: SearchInputSchema,
    outputSchema: SearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
