'use server';
/**
 * @fileOverview Generates a summary report of laptop activity using AI.
 *
 * - generateSummaryReport - A function that generates a summary report of laptop activity.
 * - GenerateSummaryReportInput - The input type for the generateSummaryReport function.
 * - GenerateSummaryReportOutput - The return type for the generateSummaryReport function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getActiveApplication, getLaptopStatus} from '@/services/laptop';

const GenerateSummaryReportInputSchema = z.object({
  laptopIds: z
    .array(z.string())
    .describe('The IDs of the laptops to generate the report for.'),
});
export type GenerateSummaryReportInput = z.infer<typeof GenerateSummaryReportInputSchema>;

const GenerateSummaryReportOutputSchema = z.object({
  report: z.string().describe('The summary report of laptop activity.'),
});
export type GenerateSummaryReportOutput = z.infer<typeof GenerateSummaryReportOutputSchema>;

export async function generateSummaryReport(input: GenerateSummaryReportInput): Promise<GenerateSummaryReportOutput> {
  return generateSummaryReportFlow(input);
}

const generateSummaryReportPrompt = ai.definePrompt({
  name: 'generateSummaryReportPrompt',
  input: {
    schema: z.object({
      laptopData: z.array(
        z.object({
          id: z.string(),
          status: z.string(),
          activeApplication: z.string(),
          timestamp: z.string(),
        })
      ),
    }),
  },
  output: {
    schema: z.object({
      report: z.string().describe('The summary report of laptop activity.'),
    }),
  },
  prompt: `You are an AI assistant that generates summary reports of laptop activity.

  Analyze the following laptop data and generate a summary report identifying usage patterns and potential anomalies.

  Laptop Data:
  {{#each laptopData}}
  - Laptop ID: {{{id}}}
    - Status: {{{status}}}
    - Active Application: {{{activeApplication}}} at {{{timestamp}}}
  {{/each}}
  `,
});

const generateSummaryReportFlow = ai.defineFlow<
  typeof GenerateSummaryReportInputSchema,
  typeof GenerateSummaryReportOutputSchema
>({
  name: 'generateSummaryReportFlow',
  inputSchema: GenerateSummaryReportInputSchema,
  outputSchema: GenerateSummaryReportOutputSchema,
},
async input => {
  const laptopData = await Promise.all(
    input.laptopIds.map(async laptopId => {
      const status = await getLaptopStatus(laptopId);
      const application = await getActiveApplication(laptopId);
      return {
        id: laptopId,
        status: status.status,
        activeApplication: application.name,
        timestamp: application.timestamp,
      };
    })
  );

  const {output} = await generateSummaryReportPrompt({
    laptopData,
  });
  return output!;
});

