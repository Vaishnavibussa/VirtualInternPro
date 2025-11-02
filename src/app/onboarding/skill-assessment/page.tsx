
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { adaptiveSkillAssessment } from "@/ai/flows/adaptive-skill-assessment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { BrainCircuit } from "lucide-react";

const formSchema = z.object({
  userSkills: z.string().min(10, "Please list at least a few skills."),
  userInterests: z.string().min(10, "Please describe your interests."),
});

export default function SkillAssessmentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userSkills: "",
      userInterests: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await adaptiveSkillAssessment(values);
      // In a real app, you'd save this and redirect to a recommendations page.
      // For now, we'll show a toast and redirect to the billing page.
      toast({
        title: "Assessment Complete!",
        description: `Recommended Role: ${result.recommendedRoles.split(',')[0]}. Next, let's set up your internship plan.`,
      });
      router.push("/onboarding/billing");
    } catch (error) {
      console.error("Skill assessment failed:", error);
      toast({
        variant: "destructive",
        title: "Assessment Failed",
        description: "The AI assessment could not be completed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Adaptive Skill Assessment</CardTitle>
              <CardDescription>
                Help us understand your strengths and passions to recommend the perfect internship role for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="userSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Skills</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., React, Node.js, Python, Figma, Agile methodology, public speaking..."
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormDescription>
                      List your technical and soft skills, separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userInterests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Interests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., building web applications, data science, project management, UI/UX design..."
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe what you're passionate about and what you'd like to work on.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                <BrainCircuit className="mr-2 h-4 w-4" />
                {isLoading ? "Analyzing..." : "Get My Recommendation"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
