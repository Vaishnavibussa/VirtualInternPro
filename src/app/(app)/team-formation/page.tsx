import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeamFormationPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Team Formation</h1>
        <p className="text-muted-foreground">
          This page will visualize team structures and project allocation.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            A visualization of team structures and the FCFS assignment logic will be here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under construction.</p>
        </CardContent>
      </Card>
    </div>
  );
}
