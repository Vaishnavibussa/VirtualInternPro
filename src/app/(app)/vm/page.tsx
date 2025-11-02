
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getVmUsageFeedback } from "@/ai/flows/vm-usage-feedback";
import { BrainCircuit, Cpu, MemoryStick, HardDrive, Network, Power, Terminal } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function VmPage() {
  const [feedback, setFeedback] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetFeedback = async () => {
    setIsLoading(true);
    setFeedback([]);
    try {
      const usageData = JSON.stringify({
        cpuUsage: "85%",
        memoryUsage: "92%",
        diskIO: "150 MB/s",
        networkTraffic: "50 Mbps",
      });

      const result = await getVmUsageFeedback({
        usageData,
        studentId: "user-123",
        projectId: "project-abc",
      });
      setFeedback(result.suggestions);
    } catch (error) {
      console.error("Error getting VM feedback:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get AI feedback. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const vmStats = [
    { name: "CPU Usage", value: 85, icon: Cpu, color: "bg-red-500" },
    { name: "Memory Usage", value: 92, icon: MemoryStick, color: "bg-red-500" },
    { name: "Disk I/O", value: 60, icon: HardDrive, color: "bg-yellow-500" },
    { name: "Network", value: 30, icon: Network, color: "bg-green-500" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Virtual Machine</h1>
        <p className="text-muted-foreground">Your personal development environment.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>VM Control</CardTitle>
              <CardDescription>Manage your VM instance.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                    <div>
                        <p className="text-sm font-medium">Status: Running</p>
                        <p className="text-xs text-muted-foreground">Uptime: 4h 32m</p>
                    </div>
                </div>
              <Button>
                <Power className="mr-2 h-4 w-4" />
                Stop VM
              </Button>
               <Button variant="outline">
                <Terminal className="mr-2 h-4 w-4" />
                Open Console
              </Button>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>AI-Powered Feedback</CardTitle>
              <CardDescription>Get suggestions to optimize your VM usage.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGetFeedback} disabled={isLoading} className="w-full">
                <BrainCircuit className="mr-2 h-4 w-4" />
                {isLoading ? "Analyzing..." : "Analyze Usage"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Resource Monitoring</CardTitle>
                    <CardDescription>Real-time statistics of your VM resources.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    {vmStats.map(stat => (
                        <div key={stat.name} className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <stat.icon className="h-5 w-5 text-muted-foreground" />
                                    <p className="font-medium">{stat.name}</p>
                                </div>
                                <p className="font-mono text-sm">{stat.value}%</p>
                            </div>
                            <Progress value={stat.value} />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {feedback.length > 0 && (
                <Alert className="mt-8">
                    <BrainCircuit className="h-4 w-4" />
                    <AlertTitle className="font-headline">AI Suggestions</AlertTitle>
                    <AlertDescription>
                        <ul className="mt-2 list-disc list-inside space-y-1">
                            {feedback.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}
        </div>
      </div>
    </div>
  );
}
