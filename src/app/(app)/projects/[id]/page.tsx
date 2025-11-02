import { mockProjects, mockUsers } from "@/lib/data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { File, GitFork, Star, Terminal } from "lucide-react";

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = mockProjects.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  const statusToValue = (status: string) => {
    switch (status) {
        case 'Done': return 100;
        case 'In Progress': return 50;
        case 'Under Review': return 75;
        default: return 10;
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">{project.title}</h1>
        <p className="text-muted-foreground mt-2">{project.description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Tasks Overview</CardTitle>
                    <CardDescription>Current status of all project tasks.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Task</TableHead>
                                <TableHead className="hidden md:table-cell">Assignee</TableHead>
                                <TableHead className="hidden md:table-cell">Due Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {project.tasks.map(task => (
                                <TableRow key={task.id}>
                                    <TableCell className="font-medium">{task.title}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {task.assignee ? (
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage src={task.assignee.avatarUrl} />
                                                    <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm">{task.assignee.name}</span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">Unassigned</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{task.dueDate}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Progress value={statusToValue(task.status)} className="h-2 w-16 hidden sm:block"/>
                                            <span className="text-xs text-muted-foreground">{task.status}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Project Info</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                     <div>
                        <p className="text-sm font-semibold mb-2">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                        {project.techStack.map(tech => (
                            <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                        </div>
                    </div>
                     <div>
                        <p className="text-sm font-semibold mb-2">Team Members</p>
                        <div className="flex -space-x-2 overflow-hidden">
                            {mockUsers.slice(0,4).map(user => (
                                <Avatar key={user.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Repository</CardTitle>
                    <CardDescription>github.com/intern-inc/ai-dashboard</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <Star className="h-4 w-4" />
                            <span>1.2k Stars</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <GitFork className="h-4 w-4" />
                            <span>345 Forks</span>
                        </div>
                    </div>
                    <Button variant="outline"><File className="mr-2 h-4 w-4"/>View Code</Button>
                    <Button><Terminal className="mr-2 h-4 w-4"/>Launch VM</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

    