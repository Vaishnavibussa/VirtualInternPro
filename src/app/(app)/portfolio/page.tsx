

"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { mockPortfolio as initialPortfolio } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Award,
  Briefcase,
  Calendar,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Pencil,
  Star,
  Trophy,
  Users,
  ExternalLink,
  Save,
} from "lucide-react";
import {
    BarChart as RechartsBarChart,
    Bar as RechartsBar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
  } from 'recharts';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Portfolio } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const skillProficiency = [
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Docker', level: 75 },
    { name: 'Git', level: 80 },
    { name: 'Agile', level: 95 },
    { name: 'Kubernetes', level: 60 },
]

const performanceAnalytics = [
    { name: 'Week 1', tasks: 5, quality: 88 },
    { name: 'Week 2', tasks: 7, quality: 90 },
    { name: 'Week 3', tasks: 6, quality: 92 },
    { name: 'Week 4', tasks: 8, quality: 95 },
]

const gamificationBadges = [
    { name: "Persistence", icon: Star, color: "text-yellow-500" },
    { name: "Leadership", icon: Users, color: "text-blue-500" },
    { name: "Debugging Pro", icon: Briefcase, color: "text-green-500" },
    { name: "Sprint Champion", icon: Trophy, color: "text-purple-500" },
];


export default function PortfolioPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [portfolioData, setPortfolioData] = useState<Portfolio>(initialPortfolio);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const role = useMemo(() => searchParams.get('role') || 'student', [searchParams]);
  
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-main');
  const projectThumbnail = PlaceHolderImages.find(p => p.id === 'project-thumbnail-1');

  const handleInputChange = (section: keyof Portfolio, field: string, value: string) => {
    setPortfolioData(prev => {
        const sectionData = prev[section];
        const keys = field.split('.');
        if (keys.length > 1) {
            // Handle nested objects like contact.email or roleSpecific.university
            let currentLevel: any = sectionData;
            for (let i = 0; i < keys.length - 1; i++) {
                currentLevel = currentLevel[keys[i]];
            }
            currentLevel[keys[keys.length - 1]] = value;
        } else {
            (sectionData as any)[field] = value;
        }
        return { ...prev };
    });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Portfolio Saved!",
      description: "Your changes have been successfully saved.",
    });
    setIsEditMode(false);
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const newImageUrl = loadEvent.target?.result as string;
        setPortfolioData(prev => ({
          ...prev,
          personalOverview: {
            ...prev.personalOverview,
            photoUrl: newImageUrl,
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const RoleSpecificProfile = () => {
    if (isEditMode) {
      switch (role) {
        case 'pm':
          return (
            <>
              <div className="space-y-1">
                <Label>Years of Experience</Label>
                <Select value={portfolioData.roleSpecific.experience} onValueChange={value => handleInputChange('roleSpecific', 'experience', value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0-2 years">0-2 years</SelectItem>
                        <SelectItem value="3-5 years">3-5 years</SelectItem>
                        <SelectItem value="5+ years">5+ years</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Agile Methodologies</Label>
                <Input value={portfolioData.roleSpecific.methodologies} onChange={e => handleInputChange('roleSpecific', 'methodologies', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Largest Team Managed</Label>
                <Input type="number" value={portfolioData.roleSpecific.teamSize} onChange={e => handleInputChange('roleSpecific', 'teamSize', e.target.value)} />
              </div>
            </>
          );
        case 'admin':
          return (
            <div className="space-y-1">
              <Label>Department</Label>
              <Input value={portfolioData.roleSpecific.department} onChange={e => handleInputChange('roleSpecific', 'department', e.target.value)} />
            </div>
          );
        case 'student':
        default:
          return (
            <>
              <div className="space-y-1">
                <Label>University</Label>
                <Input value={portfolioData.roleSpecific.university} onChange={e => handleInputChange('roleSpecific', 'university', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Major</Label>
                <Input value={portfolioData.roleSpecific.major} onChange={e => handleInputChange('roleSpecific', 'major', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Graduation Year</Label>
                <Input type="number" value={portfolioData.roleSpecific.graduationYear} onChange={e => handleInputChange('roleSpecific', 'graduationYear', e.target.value)} />
              </div>
            </>
          );
      }
    }

    // View mode
    switch (role) {
      case 'pm':
        return (
          <>
            <p><span className="font-semibold">Experience:</span> {portfolioData.roleSpecific.experience}</p>
            <p><span className="font-semibold">Methodologies:</span> {portfolioData.roleSpecific.methodologies}</p>
            <p><span className="font-semibold">Largest Team:</span> {portfolioData.roleSpecific.teamSize} members</p>
          </>
        );
      case 'admin':
        return <p><span className="font-semibold">Department:</span> {portfolioData.roleSpecific.department}</p>;
      case 'student':
      default:
        return (
          <>
            <p><span className="font-semibold">University:</span> {portfolioData.roleSpecific.university}</p>
            <p><span className="font-semibold">Major:</span> {portfolioData.roleSpecific.major}</p>
            <p><span className="font-semibold">Graduation:</span> {portfolioData.roleSpecific.graduationYear}</p>
          </>
        );
    }
  }


  return (
    <div className="flex flex-col gap-8">
      {/* Header and Edit Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">My Portfolio</h1>
        <div className="flex items-center space-x-2 md:space-x-4">
          {isEditMode && (
             <Button onClick={handleSaveChanges} size="sm">
                <Save className="mr-2 h-4 w-4"/> Save Changes
             </Button>
          )}
          <div className="flex items-center space-x-2">
            <Label htmlFor="edit-mode-switch">Edit Mode</Label>
            <Switch
                id="edit-mode-switch"
                checked={isEditMode}
                onCheckedChange={setIsEditMode}
            />
          </div>
           <Button variant="outline" size="sm"><ExternalLink className="mr-2 h-4 w-4" /> Share</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
            {/* Personal Overview */}
            <Card>
                <CardHeader className="text-center">
                     <div className="relative w-24 h-24 mx-auto">
                        <Avatar className="w-24 h-24 mx-auto ring-4 ring-primary ring-offset-4 ring-offset-background">
                            <AvatarImage src={portfolioData.personalOverview.photoUrl || userAvatar?.imageUrl} alt={portfolioData.personalOverview.fullName} />
                            <AvatarFallback>{portfolioData.personalOverview.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {isEditMode && (
                        <>
                            <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handlePhotoChange}
                            accept="image/*"
                            className="hidden"
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Pencil className="w-4 h-4" />
                            </Button>
                        </>
                        )}
                    </div>
                     <CardTitle className="pt-6">
                        {isEditMode ? (
                            <Input
                                value={portfolioData.personalOverview.fullName}
                                onChange={(e) => handleInputChange('personalOverview', 'fullName', e.target.value)}
                                className="text-center text-2xl font-semibold leading-none tracking-tight font-headline"
                            />
                        ) : (
                            portfolioData.personalOverview.fullName
                        )}
                     </CardTitle>
                    <CardDescription>
                         {isEditMode ? (
                            <Input
                                value={portfolioData.personalOverview.headline}
                                onChange={(e) => handleInputChange('personalOverview', 'headline', e.target.value)}
                                className="text-center"
                            />
                        ) : (
                            portfolioData.personalOverview.headline
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                    {isEditMode ? (
                        <Textarea
                            value={portfolioData.personalOverview.bio}
                            onChange={(e) => handleInputChange('personalOverview', 'bio', e.target.value)}
                            rows={4}
                            className="text-center"
                        />
                    ) : (
                       <p className="text-muted-foreground text-center">{portfolioData.personalOverview.bio}</p>
                    )}
                    <Separator className="my-4"/>
                    <div className="space-y-3 text-left">
                        <div className="flex items-center gap-3">
                            <Mail />
                            {isEditMode ? (
                                <Input value={portfolioData.personalOverview.contact.email} onChange={e => handleInputChange('personalOverview', 'contact.email', e.target.value)} />
                            ) : (
                                <a href={`mailto:${portfolioData.personalOverview.contact.email}`} className="hover:underline">{portfolioData.personalOverview.contact.email}</a>
                            )}
                        </div>
                         <div className="flex items-center gap-3">
                            <Phone />
                            {isEditMode ? (
                                <Input value={portfolioData.personalOverview.contact.phone} onChange={e => handleInputChange('personalOverview', 'contact.phone', e.target.value)} />
                            ) : (
                                <span>{portfolioData.personalOverview.contact.phone}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <Linkedin />
                             {isEditMode ? (
                                <Input value={portfolioData.personalOverview.links.linkedin} onChange={e => handleInputChange('personalOverview', 'links.linkedin', e.target.value)} />
                            ) : (
                                <a href={portfolioData.personalOverview.links.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn Profile</a>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <Github />
                             {isEditMode ? (
                                <Input value={portfolioData.personalOverview.links.github} onChange={e => handleInputChange('personalOverview', 'links.github', e.target.value)} />
                            ) : (
                                <a href={portfolioData.personalOverview.links.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub Portfolio</a>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin />
                            {isEditMode ? (
                                <Input value={portfolioData.personalOverview.location.country} onChange={e => handleInputChange('personalOverview', 'location.country', e.target.value)} />
                            ) : (
                                <span>{portfolioData.personalOverview.location.country} ({portfolioData.personalOverview.location.timeZone})</span>
                            )}
                        </div>
                    </div>
                     <Separator className="my-4"/>
                      <Button className="w-full" asChild>
                        <a href={portfolioData.personalOverview.resumeUrl} download>
                          <Download className="mr-2" />
                          Download Resume
                        </a>
                      </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <RoleSpecificProfile />
                </CardContent>
            </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
             {/* Internship Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Internship Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div className="flex items-center gap-3"><Briefcase className="text-primary" /><div><span className="font-semibold">Title:</span> {portfolioData.internshipSummary.title}</div></div>
                    <div className="flex items-center gap-3"><Calendar className="text-primary" /><div><span className="font-semibold">Duration:</span> {portfolioData.internshipSummary.duration}</div></div>
                    <div className="flex items-center gap-3"><FileText className="text-primary" /><div><span className="font-semibold">Project:</span> {portfolioData.internshipSummary.projectName}</div></div>
                    <div className="flex items-center gap-3"><Star className="text-primary" /><div><span className="font-semibold">Mentor:</span> {portfolioData.internshipSummary.mentor}</div></div>
                    <div className="flex items-center gap-3"><Users className="text-primary" /><div><span className="font-semibold">Team:</span> {portfolioData.internshipSummary.team.join(', ')}</div></div>
                    <div className="flex items-center gap-3"><Award className="text-primary" /><div><span className="font-semibold">Batch:</span> {portfolioData.internshipSummary.batchNumber}</div></div>
                </CardContent>
            </Card>

            {/* Skills & Technologies */}
            <Card>
                <CardHeader>
                    <CardTitle>Skills & Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {skillProficiency.map(skill => (
                            <div key={skill.name}>
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm font-medium">{skill.name}</p>
                                    <p className="text-sm text-muted-foreground">{skill.level}%</p>
                                </div>
                                <Progress value={skill.level} className="h-2" />
                            </div>
                        ))}
                    </div>
                    <Separator className="my-6"/>
                    <div>
                        <h4 className="font-semibold mb-3">Certifications</h4>
                        <div className="flex flex-wrap gap-2">
                            {portfolioData.skills.certifications.map((cert, i) => (
                                <Badge key={i} variant="secondary">{cert}</Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Projects Showcase */}
            <Card>
                <CardHeader>
                    <CardTitle>Projects Showcase</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {portfolioData.projects.map(project => (
                        <div key={project.title} className="flex flex-col md:flex-row gap-6">
                            {projectThumbnail && <Image src={projectThumbnail.imageUrl} alt={project.title} width={200} height={120} className="rounded-lg object-cover w-full md:w-[200px]"/>}
                            <div className="flex-1">
                                <h4 className="font-semibold">{project.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {project.techStack.map(tech => <Badge key={tech} variant="outline">{tech}</Badge>)}
                                </div>
                                <div className="flex gap-4 mt-3">
                                    <Button variant="ghost" size="sm" asChild><a href={project.repoLink} target="_blank" rel="noreferrer"><Github className="mr-2"/>Repo</a></Button>
                                    <Button variant="ghost" size="sm" asChild><a href={project.demoLink} target="_blank" rel="noreferrer"><ExternalLink className="mr-2"/>Demo</a></Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

             {/* Performance & Analytics */}
            <Card>
                <CardHeader>
                    <CardTitle>Performance & Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold">{portfolioData.performance.taskCompletionRate}%</p>
                            <p className="text-xs text-muted-foreground">Task Completion</p>
                        </div>
                         <div>
                            <p className="text-2xl font-bold">{portfolioData.performance.timelySubmissionScore}%</p>
                            <p className="text-xs text-muted-foreground">Timely Submission</p>
                        </div>
                         <div>
                            <p className="text-2xl font-bold">{portfolioData.performance.codeQuality}%</p>
                            <p className="text-xs text-muted-foreground">Code Quality</p>
                        </div>
                         <div>
                            <p className="text-2xl font-bold">{portfolioData.performance.peerCollabScore}%</p>
                            <p className="text-xs text-muted-foreground">Peer Collaboration</p>
                        </div>
                    </div>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={performanceAnalytics}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <RechartsTooltip contentStyle={{
                                    backgroundColor: "hsl(var(--background))",
                                    borderColor: "hsl(var(--border))",
                                }}/>
                                <RechartsBar dataKey="tasks" fill="hsl(var(--primary))" name="Tasks Completed" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Badges Earned</h4>
                        <div className="flex flex-wrap gap-4">
                            {gamificationBadges.map(badge => (
                                <TooltipProvider key={badge.name}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className={`p-3 rounded-full bg-muted border ${isEditMode ? 'cursor-pointer hover:bg-muted/80' : ''}`}>
                                            <badge.icon className={`h-6 w-6 ${badge.color}`} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{badge.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}
