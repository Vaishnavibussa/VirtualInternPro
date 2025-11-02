
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Rectangle,
  CartesianGrid,
} from "recharts";
import {
  Users,
  CheckCircle,
  Clock,
  Code,
  ArrowDown,
  ArrowUp,
  Download,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  taskCompletionData,
  trackProgressData,
  skillsDevelopmentData,
  activityTimelineData,
} from "@/lib/data";

export default function AnalyticsPage() {

  const handleExport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Task Completion Data
    csvContent += "Task Completion Trend\n";
    const taskHeaders = Object.keys(taskCompletionData[0]);
    csvContent += taskHeaders.join(",") + "\n";
    taskCompletionData.forEach(row => {
        const values = taskHeaders.map(header => row[header as keyof typeof row]);
        csvContent += values.join(",") + "\n";
    });

    csvContent += "\n"; // Add a blank line for spacing

    // Track Progress Data
    csvContent += "Track Progress by Area\n";
    const progressHeaders = Object.keys(trackProgressData[0]);
    csvContent += progressHeaders.join(",") + "\n";
    trackProgressData.forEach(row => {
        const values = progressHeaders.map(header => row[header as keyof typeof row]);
        csvContent += values.join(",") + "\n";
    });
    
    csvContent += "\n";

    // Skills Development Data
    csvContent += "Skills Development\n";
    const skillsHeaders = ["Skill", "Proficiency"];
    csvContent += skillsHeaders.join(",") + "\n";
    skillsDevelopmentData.forEach(row => {
        csvContent += `${row.name},${row.value}\n`;
    });


    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "analytics_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Analytics Dashboard
        </h1>
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="sm" className="hidden md:flex">Last 30 days</Button>
          <Button onClick={handleExport} size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +8.2%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Done</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +2.1%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Resolution</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72h</div>
            <p className="text-xs text-red-500 flex items-center">
              <ArrowDown className="h-3 w-3 mr-1" />
              -5.3%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-muted-foreground">
                  Task Completion Rate
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">72h</p>
                <p className="text-sm text-muted-foreground">
                  Avg. Resolution Time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Code className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">92%</p>
                <p className="text-sm text-muted-foreground">
                  Code Quality Score
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Skills Development</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {skillsDevelopmentData.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">{skill.name}</p>
                  <p className="text-sm text-muted-foreground">{skill.value}%</p>
                </div>
                <Progress value={skill.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6">
              <div className="absolute left-[1px] top-1 h-full w-0.5 bg-border"></div>
              {activityTimelineData.map((activity, index) => (
                <div key={index} className="relative mb-6">
                  <div className={`absolute -left-[23px] top-1 h-2 w-2 rounded-full ${activity.color}`}></div>
                  <p className="font-semibold text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Task Completion Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={taskCompletionData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Area type="monotone" dataKey="completed" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorCompletion)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Track Progress by Area</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={trackProgressData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="area"
                  type="category"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={60}
                />
                <Tooltip
                    cursor={{fill: 'hsl(var(--muted))'}}
                    contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                    }}
                />
                <Bar dataKey="progress" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
