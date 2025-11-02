
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Suspense } from "react";

const roles = [
  {
    name: "Developer",
    price: "₹15,999",
    features: ["Hands-on coding tasks", "Real-world project", "Code reviews", "Technical mentorship"],
    popular: false,
  },
  {
    name: "Project Manager",
    price: "₹19,999",
    features: ["Lead a team of interns", "JIRA-style task management", "Agile methodologies", "Leadership mentorship"],
    popular: true,
  },
  {
    name: "Tester / QA",
    price: "₹14,499",
    features: ["Manual and automated testing", "Bug tracking and reporting", "CI/CD pipeline integration", "QA best practices"],
    popular: false,
  },
  {
    name: "DevOps",
    price: "₹18,499",
    features: ["Manage infrastructure", "CI/CD pipeline setup", "Cloud services (GCP/AWS)", "Infrastructure as Code"],
    popular: false,
  },
];

function BillingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const handleSelectRole = (roleName: string) => {
        toast({
            title: "Plan Selected! Welcome aboard!",
            description: `You've chosen the ${roleName} track. Welcome to VirtualInternPro!`,
        });
        const role = searchParams.get('role') || roleName.toLowerCase().replace(/[^a-z]/g, '');
        router.push(`/dashboard?role=${role}`);
    }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
        <div className="flex flex-col gap-4 w-full max-w-5xl">
            <div className="mb-4 text-center">
                <h1 className="text-4xl font-bold font-headline tracking-tight">Choose Your Role</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Select the internship track that aligns with your career goals. Each role offers a unique, hands-on experience.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {roles.map((role) => (
                <Card key={role.name} className={`flex flex-col ${role.popular ? 'border-primary ring-2 ring-primary' : ''}`}>
                    {role.popular && <div className="bg-primary text-primary-foreground text-xs font-bold text-center py-1 rounded-t-lg">MOST POPULAR</div>}
                    <CardHeader className="items-center text-center">
                    <CardTitle className="font-headline text-2xl">{role.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">{role.price}</span>
                        <span className="text-muted-foreground">/internship</span>
                    </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                    <ul className="space-y-3">
                        {role.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-accent" />
                            <span>{feature}</span>
                        </li>
                        ))}
                    </ul>
                    </CardContent>
                    <CardFooter>
                    <Button 
                        className={`w-full ${role.popular ? '' : 'bg-accent hover:bg-accent/90'}`}
                        onClick={() => handleSelectRole(role.name)}
                    >
                        Select Role
                    </Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
             <div className="text-center mt-4">
                <Button variant="link" onClick={() => router.push(`/dashboard?role=${searchParams.get('role') || 'student'}`)}>
                    Skip for now &rarr;
                </Button>
            </div>
        </div>
    </div>
  );
}

export default function BillingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BillingContent />
        </Suspense>
    )
}
