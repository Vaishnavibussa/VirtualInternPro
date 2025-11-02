
"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { mockProjects, mockTasks, mockUsers } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Download, Plus, Play, Power } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Task } from "@/lib/types";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-sm">{task.title}</h4>
        </div>
        <p className="text-xs text-muted-foreground mb-3">Create login/signup functionality with JWT tokens.</p>
        <div className="flex justify-between items-center">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">5 SP</Badge>
            {task.assignee && (
                <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} />
                    <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                </Avatar>
            )}
        </div>
      </CardContent>
    </Card>
  )
}

const ProjectCard = ({ project, vmRunning, onToggleVm, progress }: { project: typeof mockProjects[0], vmRunning: boolean, onToggleVm: () => void, progress: number }) => {
  const { toast } = useToast();

  const handleVmAction = () => {
    onToggleVm();
    toast({
        title: vmRunning ? "VM Stopping" : "VM Starting",
        description: `The VM for "${project.title}" is being ${vmRunning ? 'stopped' : 'started'}.`
    });
  }

  return (
    <Card className="flex-1 min-w-[300px]">
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
            <Badge variant={vmRunning ? "default" : "secondary"}>{vmRunning ? "VM Running" : "VM Stopped"}</Badge>
        </div>
        <CardDescription>{project.description}</CardDescription>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground pt-2">
            <Badge variant="outline">Development Phase</Badge>
            <span>{progress}% Complete</span>
            <span className="hidden sm:inline">Due: Sept 16, 2024</span>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>CPU: {vmRunning ? "25.84%" : "0%"}</span>
            </div>
            <Progress value={vmRunning ? 25.84 : 0} className="h-2" />
        </div>
        <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Memory: {vmRunning ? "62.17%" : "0%"}</span>
            </div>
            <Progress value={vmRunning ? 62.17 : 0} className="h-2" />
        </div>
        <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Storage: {vmRunning ? "35%" : "0%"}</span>
            </div>
            <Progress value={vmRunning ? 35 : 0} className="h-2" />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button variant="outline" className="w-full" asChild>
                <Link href={`/projects/${project.id}`}>View Details</Link>
            </Button>
            <Button className="w-full" onClick={handleVmAction}>
                {vmRunning ? <Power className="mr-2" /> : <Play className="mr-2" />}
                {vmRunning ? "Stop VM" : "Start VM"}
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProjectsPage() {
    const { toast } = useToast();
    const tasksByStatus = (status: string) => mockTasks.filter(t => t.status === status);
    const [vmStates, setVmStates] = useState({ p1: true, p2: false });
    const [tasks, setTasks] = useState(mockTasks);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskStatus, setNewTaskStatus] = useState<Task['status']>('To Do');

    const handleToggleVm = (projectId: string) => {
        setVmStates(prev => ({...prev, [projectId]: !prev[projectId]}));
    }

    const handleCreateTask = () => {
        if (!newTaskTitle) {
            toast({ variant: 'destructive', title: 'Task title is required.' });
            return;
        }
        const newTask: Task = {
            id: `t${tasks.length + 1}`,
            title: newTaskTitle,
            status: newTaskStatus,
            dueDate: new Date().toISOString().split('T')[0],
        };
        setTasks(prev => [newTask, ...prev]);
        toast({ title: 'Task created!', description: `Task "${newTaskTitle}" has been added.` });
        setNewTaskTitle("");
    }


  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Project Management</h1>
        <div className="flex gap-2">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline"><Download className="mr-2 h-4 w-4"/>Export</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Export Data</DialogTitle>
                        <DialogDescription>
                            This feature is coming soon. You'll be able to export project data in various formats.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button>OK</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild>
                    <Button><Plus className="mr-2 h-4 w-4"/>New Task</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="task-title" className="text-right">Title</Label>
                            <Input id="task-title" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} className="col-span-3" placeholder="e.g., Implement dark mode"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="task-status" className="text-right">Status</Label>
                            <Select onValueChange={(value: Task['status']) => setNewTaskStatus(value)} defaultValue={newTaskStatus}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="To Do">To Do</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Under Review">Under Review</SelectItem>
                                    <SelectItem value="Done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <DialogClose asChild><Button onClick={handleCreateTask}>Create Task</Button></DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-4">
        <ProjectCard project={mockProjects[0]} vmRunning={vmStates.p1} onToggleVm={() => handleToggleVm('p1')} progress={68} />
        <ProjectCard project={mockProjects[1]} vmRunning={vmStates.p2} onToggleVm={() => handleToggleVm('p2')} progress={84} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
            <div className="flex items-center gap-2 mb-4">
                <h2 className="font-semibold text-lg">To Do</h2>
                <Badge variant="secondary" className="rounded-full">{tasksByStatus("To Do").length}</Badge>
            </div>
            <div className="flex flex-col gap-4">
                {tasksByStatus("To Do").map(task => <TaskCard key={task.id} task={task} />)}
            </div>
        </div>
         <div>
            <div className="flex items-center gap-2 mb-4">
                <h2 className="font-semibold text-lg">In Progress</h2>
                <Badge variant="secondary" className="rounded-full">{tasksByStatus("In Progress").length}</Badge>
            </div>
            <div className="flex flex-col gap-4">
                {tasksByStatus("In Progress").map(task => <TaskCard key={task.id} task={task} />)}
            </div>
        </div>
         <div>
            <div className="flex items-center gap-2 mb-4">
                <h2 className="font-semibold text-lg">Review</h2>
                <Badge variant="secondary" className="rounded-full">{tasksByStatus("Under Review").length}</Badge>
            </div>
            <div className="flex flex-col gap-4">
                {tasksByStatus("Under Review").map(task => <TaskCard key={task.id} task={task} />)}
            </div>
        </div>
         <div>
            <div className="flex items-center gap-2 mb-4">
                <h2 className="font-semibold text-lg">Done</h2>
                <Badge variant="secondary" className="rounded-full">{tasksByStatus("Done").length}</Badge>
            </div>
            <div className="flex flex-col gap-4">
                {tasksByStatus("Done").map(task => <TaskCard key={task.id} task={task} />)}
            </div>
        </div>
      </div>
    </div>
  );
}

    