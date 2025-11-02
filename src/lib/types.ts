

export type Role = "Student" | "Project Manager" | "Admin";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: Role;
};

export type TaskStatus = "To Do" | "In Progress" | "Under Review" | "Done";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  assignee?: User;
  dueDate: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  tasks: Task[];
};

export type Activity = {
  id: string;
  user: User;
  action: string;
  timestamp: string;
  details?: string;
};

export type Portfolio = {
    personalOverview: {
      fullName: string;
      role: string;
      headline: string;
      bio: string;
      photoUrl?: string;
      contact: {
        email: string;
        phone?: string;
      };
      links: {
        linkedin: string;
        github: string;
      };
      resumeUrl: string;
      location: {
        country: string;
        timeZone: string;
      };
    };
    internshipSummary: {
      title: string;
      duration: string;
      projectName: string;
      mentor: string;
      projectCategory: string;
      roleDescription: string;
      team: string[];
      institution: string;
      batchNumber: string;
    };
    skills: {
        primary: string[];
        secondary: string[];
        certifications: string[];
    };
    projects: {
        title: string;
        description: string;
        techStack: string[];
        repoLink: string;
        demoLink: string;
        mentorFeedback: string;
        aiEvaluationScore: number;
    }[];
    performance: {
        taskCompletionRate: number;
        timelySubmissionScore: number;
        codeQuality: number;
        peerCollabScore: number;
    },
    mentorship: {
        latestComments: {
            comment: string;
            mentor: string;
        }[];
        aiSummary: {
            strengths: string;
            improvements: string;
        }
    },
    futureGoals: {
        careerGoals: string;
        aiRecommendation: {
            title: string,
            description: string;
        }
    },
    roleSpecific: {
      // Student
      university?: string;
      major?: string;
      graduationYear?: string;
      // Project Manager
      experience?: string;
      methodologies?: string;
      teamSize?: string;
      // Admin
      department?: string;
    }
  };
