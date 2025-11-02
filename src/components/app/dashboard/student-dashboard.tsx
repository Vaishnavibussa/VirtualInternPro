import {
  Activity,
  ArrowUpRight,
  Award,
  CheckCircle,
  ClipboardList,
  Code,
  FileText,
  Rocket,
  Bug,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CircularProgress } from "./circular-progress";
import { mockActivities, mockTasks, mockUsers } from "@/lib/data";

const tasks = mockTasks.slice(0, 6);
const teamMembers = mockUsers.slice(0, 3);
const recentActivities = [
  {
    id: "ra1",
    icon: CheckCircle,
    text: "Completed authentication module",
    time: "2 hours ago",
    iconColor: "text-green-500"
  },
  {
    id: "ra2",
    icon: Bug,
    text: "Bug fixed: Mobile responsive login",
    time: "Yesterday",
    iconColor: "text-orange-500"
  },
  {
    id: "ra3",
    icon: Award,
    text: 'Earned "Sprint Champion" badge',
    time: "2 days ago",
    iconColor: "text-purple-500"
  }
]

export function StudentDashboard() {
  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">Welcome back, Alex! Here's your progress overview.</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <Card key={task.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                  </div>
                  <Badge variant={
                    task.status === "Done" ? "default" :
                    task.status === "In Progress" ? "destructive" : "secondary"
                  }>{task.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="flex flex-col items-center justify-center p-6 col-span-1">
          <CardHeader className="items-center pb-4">
            <CardTitle className="font-headline">Current Progress</CardTitle>
            <CardDescription>Sprint 3 - Development Phase</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <CircularProgress value={75} label="Completed" />
            <Button variant="outline" className="w-full">View Details</Button>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center gap-3">
                    <ClipboardList className="h-6 w-6 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">14 Tasks Completed</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">3 Badges Earned</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">2 Certificates</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Team Alpha</CardTitle>
                <CardDescription>E-Learning Platform</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex -space-x-2 overflow-hidden">
                    {teamMembers.map(member => (
                        <Avatar key={member.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                            <AvatarImage src={member.avatarUrl} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    ))}
                     <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-muted text-muted-foreground">
                        <AvatarFallback>+2</AvatarFallback>
                    </Avatar>
                </div>
                <p className="text-sm text-muted-foreground">6 team members</p>
                <Button variant="outline" className="w-full">View Team</Button>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm">Task Completion Rate: 85%</p>
            </div>
            <div className="flex items-center gap-3">
              <Code className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm">Code Quality Score: 92%</p>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm">Certifications in Progress: 2</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {recentActivities.map(activity => (
            <div key={activity.id} className="flex items-center gap-3">
              <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
              <div>
                <p className="font-medium">{activity.text}</p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
