"use client";

import { Suspense, useState, useRef, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mockPortfolio as initialPortfolio } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Portfolio } from "@/lib/types";
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
} from "recharts";

// --- Static Data ---
const skillProficiency = [
  { name: "React", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Docker", level: 75 },
  { name: "Git", level: 80 },
  { name: "Agile", level: 95 },
  { name: "Kubernetes", level: 60 },
];

const performanceAnalytics = [
  { name: "Week 1", tasks: 5, quality: 88 },
  { name: "Week 2", tasks: 7, quality: 90 },
  { name: "Week 3", tasks: 6, quality: 92 },
  { name: "Week 4", tasks: 8, quality: 95 },
];

const gamificationBadges = [
  { name: "Persistence", icon: Star, color: "text-yellow-500" },
  { name: "Leadership", icon: Users, color: "text-blue-500" },
  { name: "Debugging Pro", icon: Briefcase, color: "text-green-500" },
  { name: "Sprint Champion", icon: Trophy, color: "text-purple-500" },
];

// --- Portfolio Content (wrapped in Suspense) ---
function PortfolioContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams(); // ✅ Correct placement
  const role = useMemo(() => searchParams.get("role") || "student", [searchParams]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [portfolioData, setPortfolioData] = useState<Portfolio>(initialPortfolio);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userAvatar = PlaceHolderImages.find((p) => p.id === "user-avatar-main");
  const projectThumbnail = PlaceHolderImages.find((p) => p.id === "project-thumbnail-1");

  const handleInputChange = (section: keyof Portfolio, field: string, value: string) => {
    setPortfolioData((prev) => {
      const sectionData = prev[section];
      const keys = field.split(".");
      if (keys.length > 1) {
        let currentLevel: any = sectionData;
        for (let i = 0; i < keys.length - 1; i++) currentLevel = currentLevel[keys[i]];
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
        setPortfolioData((prev) => ({
          ...prev,
          personalOverview: {
            ...prev.personalOverview,
            photoUrl: newImageUrl,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const RoleSpecificProfile = () => {
    if (isEditMode) {
      switch (role) {
        case "pm":
          return (
            <>
              <div className="space-y-1">
                <Label>Years of Experience</Label>
                <Select
                  value={portfolioData.roleSpecific.experience}
                  onValueChange={(value) => handleInputChange("roleSpecific", "experience", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2 years">0-2 years</SelectItem>
                    <SelectItem value="3-5 years">3-5 years</SelectItem>
                    <SelectItem value="5+ years">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Agile Methodologies</Label>
                <Input
                  value={portfolioData.roleSpecific.methodologies}
                  onChange={(e) => handleInputChange("roleSpecific", "methodologies", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Largest Team Managed</Label>
                <Input
                  type="number"
                  value={portfolioData.roleSpecific.teamSize}
                  onChange={(e) => handleInputChange("roleSpecific", "teamSize", e.target.value)}
                />
              </div>
            </>
          );
        case "admin":
          return (
            <div className="space-y-1">
              <Label>Department</Label>
              <Input
                value={portfolioData.roleSpecific.department}
                onChange={(e) => handleInputChange("roleSpecific", "department", e.target.value)}
              />
            </div>
          );
        default:
          return (
            <>
              <div className="space-y-1">
                <Label>University</Label>
                <Input
                  value={portfolioData.roleSpecific.university}
                  onChange={(e) => handleInputChange("roleSpecific", "university", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Major</Label>
                <Input
                  value={portfolioData.roleSpecific.major}
                  onChange={(e) => handleInputChange("roleSpecific", "major", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Graduation Year</Label>
                <Input
                  type="number"
                  value={portfolioData.roleSpecific.graduationYear}
                  onChange={(e) => handleInputChange("roleSpecific", "graduationYear", e.target.value)}
                />
              </div>
            </>
          );
      }
    }

    // View mode
    switch (role) {
      case "pm":
        return (
          <>
            <p><span className="font-semibold">Experience:</span> {portfolioData.roleSpecific.experience}</p>
            <p><span className="font-semibold">Methodologies:</span> {portfolioData.roleSpecific.methodologies}</p>
            <p><span className="font-semibold">Largest Team:</span> {portfolioData.roleSpecific.teamSize} members</p>
          </>
        );
      case "admin":
        return <p><span className="font-semibold">Department:</span> {portfolioData.roleSpecific.department}</p>;
      default:
        return (
          <>
            <p><span className="font-semibold">University:</span> {portfolioData.roleSpecific.university}</p>
            <p><span className="font-semibold">Major:</span> {portfolioData.roleSpecific.major}</p>
            <p><span className="font-semibold">Graduation:</span> {portfolioData.roleSpecific.graduationYear}</p>
          </>
        );
    }
  };

  // ---- Main JSX ----
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">My Portfolio</h1>
        <div className="flex items-center space-x-2 md:space-x-4">
          {isEditMode && (
            <Button onClick={handleSaveChanges} size="sm">
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          )}
          <div className="flex items-center space-x-2">
            <Label htmlFor="edit-mode-switch">Edit Mode</Label>
            <Switch id="edit-mode-switch" checked={isEditMode} onCheckedChange={setIsEditMode} />
          </div>
          <Button variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      {/* Rest of the page (unchanged) */}
      {/* ... keep your existing Card sections exactly the same ... */}
    </div>
  );
}

// --- Wrapped in Suspense to prevent build errors ---
export default function PortfolioPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading Portfolio...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
