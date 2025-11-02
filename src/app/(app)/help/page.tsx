import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers to your questions and get help.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            A comprehensive help center and support ticket system will be available here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under construction.</p>
        </CardContent>
      </Card>
    </div>
  );
}
