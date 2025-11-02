
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar as CalendarIcon, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type LearningGoal = {
  title: string;
  progress: number;
};

const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "01:00 PM", "02:00 PM", "03:00 PM",
    "04:00 PM", "05:00 PM",
];

export default function MentorshipPage() {
  const { toast } = useToast();
  const mentorAvatar = PlaceHolderImages.find(p => p.id === 'mentor-avatar');
  const [open, setOpen] = useState(false);

  const [learningGoals, setLearningGoals] = useState<LearningGoal[]>([
    { title: "Master System Design", progress: 85 },
    { title: "Cloud Architecture Certification", progress: 45 },
  ]);
  const [newGoal, setNewGoal] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleAddGoal = () => {
    if (newGoal.trim() !== "") {
      setLearningGoals([...learningGoals, { title: newGoal, progress: 0 }]);
      setNewGoal("");
      toast({
        title: "New Goal Added!",
        description: `Your goal "${newGoal}" has been added to your list.`,
      });
    }
  };
  
  const upcomingSessions = [
    {
      title: "Code Review & Architecture Discussion",
      mentor: "Dr. Sarah Chen",
      time: "Tomorrow, 2:00 PM",
      duration: "1 hour session",
    },
     {
      title: "Career Goals & Planning",
      mentor: "Dr. Sarah Chen",
      time: "Next week",
      duration: "30 min session",
    },
  ];

  const recentFeedbacks = [
    {
        title: "Authentication Module Review",
        date: "Aug 15, 2024",
        feedback: "“Excellent implementation of JWT tokens. Consider adding rate limiting for enhanced security.”",
        rating: 4
    },
    {
        title: "Database Schema Design",
        date: "Aug 01, 2024",
        feedback: "“Well-structured schema. The use of indexing is efficient. Good job.”",
        rating: 5
    }
  ]

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      toast({
        title: "Session Scheduled!",
        description: `Your session with Dr. Sarah Chen has been booked for ${format(selectedDate, "PPP")} at ${selectedTime}.`,
      });
      setOpen(false);
      setSelectedTime(null);
    } else {
       toast({
        variant: "destructive",
        title: "Incomplete Selection",
        description: `Please select both a date and a time.`,
      });
    }
  };

  const ScheduleSessionDialog = ({ trigger }: { trigger: React.ReactNode}) => (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Schedule a session</DialogTitle>
                <DialogDescription>
                    Select a date and time to schedule a session with your mentor.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="flex justify-center">
                  <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                  />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Available Time Slots</h4>
                <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map(time => (
                        <Button 
                            key={time} 
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => setSelectedTime(time)}
                            className="text-xs"
                        >
                            {time}
                        </Button>
                    ))}
                </div>
              </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSchedule} disabled={!selectedDate || !selectedTime}>Schedule</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Mentorship Program</h1>
        <ScheduleSessionDialog trigger={
            <Button>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Schedule Session
            </Button>
        } />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-3">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              {mentorAvatar && <AvatarImage src={mentorAvatar.imageUrl} alt="Mentor Avatar" data-ai-hint={mentorAvatar.imageHint} />}
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h2 className="text-xl font-bold font-headline">Dr. Sarah Chen</h2>
                <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>4.9</span>
                </div>
              </div>
              <p className="text-muted-foreground">Senior Software Architect, Google</p>
              <p className="text-sm text-muted-foreground mt-2">12 years experience • 6 mentees • Software Architecture specialist</p>
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                <Badge variant="secondary">System Design</Badge>
                <Badge variant="secondary">Microservices</Badge>
                <Badge variant="secondary">Cloud Architecture</Badge>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
                <Button variant="outline" onClick={() => toast({ title: "Coming soon!", description: "Mentor profiles will be available here." })}>View Profile</Button>
                <ScheduleSessionDialog trigger={<Button>Schedule</Button>} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
         <Card>
            <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <ScrollArea className="h-48">
                <CardContent className="grid gap-4">
                    {upcomingSessions.map((session, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                            <p className="font-semibold">{session.title}</p>
                            <p className="text-sm text-muted-foreground">With {session.mentor}</p>
                            <p className="text-sm font-bold my-2">{session.time}</p>
                            <p className="text-xs text-muted-foreground mb-4">{session.duration}</p>
                            <div className="flex gap-2">
                                <Button size="sm" className="w-full" onClick={() => toast({ title: "Joining Session...", description: "You will be redirected to the meeting." })}>Join</Button>
                                <Button size="sm" variant="outline" className="w-full" onClick={() => toast({ title: "Opening scheduler...", description: "Please select a new time for your session." })}>Reschedule</Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </ScrollArea>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <ScrollArea className="h-48">
                <CardContent className="grid gap-4">
                     {recentFeedbacks.map((fb, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-baseline">
                                <p className="font-semibold">{fb.title}</p>
                                <p className="text-xs text-muted-foreground">{fb.date}</p>
                            </div>
                            <p className="text-sm text-muted-foreground italic my-2">{fb.feedback}</p>
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < fb.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/50'}`} />
                                ))}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </ScrollArea>
             <CardContent className="pt-0">
                <Button variant="outline" className="w-full mt-4" onClick={() => toast({ title: "Coming soon!", description: "A full history of your feedback will be available here." })}>View All Feedback</Button>
             </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Learning Goals</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {learningGoals.map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium">{goal.title}</p>
                    <p className="text-sm text-muted-foreground">Progress: {goal.progress}%</p>
                </div>
                <Progress value={goal.progress} />
              </div>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Add New Goal</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Learning Goal</DialogTitle>
                  <DialogDescription>
                    What do you want to learn or improve on?
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="goal-title" className="text-right">
                      Goal
                    </Label>
                    <Input
                      id="goal-title"
                      value={newGoal}
                      onChange={(e) => setNewGoal(e.target.value)}
                      className="col-span-3"
                      placeholder="e.g., Master React Hooks"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={handleAddGoal}>Add Goal</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
