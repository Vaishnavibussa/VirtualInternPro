
import type { User, Project, Activity, Task, Portfolio } from "./types";

export const mockUsers: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", avatarUrl: "https://picsum.photos/seed/user1/40/40", role: "Student" },
  { id: "2", name: "Bob Williams", email: "bob@example.com", avatarUrl: "https://picsum.photos/seed/user2/40/40", role: "Student" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", avatarUrl: "https://picsum.photos/seed/user3/40/40", role: "Project Manager" },
  { id: "4", name: "Diana Prince", email: "diana@example.com", avatarUrl: "https://picsum.photos/seed/user4/40/40", role: "Admin" },
];

export const mockTasks: Task[] = [
  { id: "t1", title: "Write API integration tests", status: "Done", assignee: mockUsers[0], dueDate: "2024-08-01" },
  { id: "t2", title: "Design course catalog UI", status: "To Do", assignee: mockUsers[1], dueDate: "2024-08-05" },
  { id: "t3", title: "Implement user authentication", status: "In Progress", assignee: mockUsers[0], dueDate: "2024-08-10" },
  { id: "t4", title: "Create dashboard UI", status: "To Do", dueDate: "2024-08-15", assignee: mockUsers[1] },
  { id: "t5", title: "Write unit tests for API", status: "To Do", dueDate: "2024-08-20", assignee: mockUsers[0] },
  { id: "t6", title: "Database schema design", status: "Under Review", assignee: mockUsers[1], dueDate: "2024-08-25" },
];

export const mockProjects: Project[] = [
  { 
    id: "p1", 
    title: "E-Learning Platform", 
    description: "A comprehensive online learning management system with video streaming, assessments, and progress tracking.",
    techStack: ["Next.js", "Tailwind CSS", "Genkit", "Recharts"],
    tasks: mockTasks,
  },
  {
    id: "p2",
    title: "Task Management System",
    description: "Enterprise-grade task management with team collaboration features.",
    techStack: ["Python", "TensorFlow", "Flask", "React"],
    tasks: [],
  }
];

export const mockActivities: Activity[] = [
  { id: "a1", user: mockUsers[0], action: "pushed a commit", timestamp: "2 hours ago", details: "feat: implement user login" },
  { id: "a2", user: mockUsers[1], action: "completed a task", timestamp: "5 hours ago", details: "Design database schema" },
  { id: "a3", user: mockUsers[2], action: "commented on a task", timestamp: "1 day ago", details: "Review of UI mockups" },
  { id: "a4", user: mockUsers[0], action: "created a new task", timestamp: "2 days ago", details: "Add dark mode support" },
];

export const performanceData = [
    { month: 'Jan', performance: 65, progress: 50 },
    { month: 'Feb', performance: 70, progress: 55 },
    { month: 'Mar', performance: 78, progress: 65 },
    { month: 'Apr', performance: 85, progress: 70 },
    { month: 'May', performance: 82, progress: 75 },
    { month: 'Jun', performance: 90, progress: 85 },
];

export const taskCompletionData = [
    { month: 'Jan', completed: 45 },
    { month: 'Feb', completed: 52 },
    { month: 'Mar', completed: 60 },
    { month: 'Apr', completed: 58 },
    { month: 'May', completed: 65 },
    { month: 'Jun', completed: 73 },
    { month: 'Jul', completed: 80 },
    { month: 'Aug', completed: 85 },
];

export const trackProgressData = [
    { area: 'Design', progress: 90 },
    { area: 'Frontend', progress: 75 },
    { area: 'Backend', progress: 80 },
    { area: 'Testing', progress: 70 },
    { area: 'Docs', progress: 60 },
];

export const skillsDevelopmentData = [
    { name: 'React', value: 75 },
    { name: 'Node.js', value: 70 },
    { name: 'Testing (Jest)', value: 60 },
    { name: 'MongoDB', value: 45 },
];

export const activityTimelineData = [
    { action: 'Completed Sprint 3 tasks', timestamp: 'Today, 3:30 PM', color: 'bg-primary' },
    { action: 'Code review session with mentor', timestamp: 'Yesterday, 2:00 PM', color: 'bg-green-500' },
    { action: 'Fixed authentication bug', timestamp: 'Aug 17, 4:15 PM', color: 'bg-yellow-500' },
];

export const mockPortfolio: Portfolio = {
    personalOverview: {
      fullName: "Alex Kumar",
      role: "Developer",
      headline: "AI Developer Intern | Cloud Enthusiast",
      bio: "Aspiring software developer with a passion for building intelligent applications and scalable cloud solutions. Eager to learn and contribute to real-world projects.",
      contact: {
        email: "alex.kumar@example.com",
        phone: "+1 (555) 123-4567"
      },
      links: {
        linkedin: "https://linkedin.com/in/alexkumar",
        github: "https://github.com/alexkumar"
      },
      resumeUrl: "/resume.pdf",
      location: {
        country: "USA",
        timeZone: "PST"
      }
    },
    internshipSummary: {
      title: "AI Developer Intern",
      duration: "June 2024 - Sept 2024",
      projectName: "E-Learning Platform",
      mentor: "Dr. Sarah Chen",
      projectCategory: "AI, Web Dev",
      roleDescription: "Developed and integrated AI features into a web-based e-learning platform, focusing on backend services and model deployment.",
      team: ["Alice", "Bob", "Charlie"],
      institution: "State University",
      batchNumber: "Summer '24"
    },
    skills: {
        primary: ["React", "Node.js", "Docker"],
        secondary: ["Git", "Agile", "Kubernetes"],
        certifications: ["GCP Associate Cloud Engineer", "Genkit Certified Developer"],
    },
    projects: [{
        title: "AI-Powered Course Recommender",
        description: "Built a recommendation engine using Genkit to suggest courses to users based on their profile and activity.",
        techStack: ["Genkit", "Next.js", "Tailwind"],
        repoLink: "https://github.com/alexkumar/recommender",
        demoLink: "#",
        mentorFeedback: "Excellent work on the recommendation logic. The API is well-structured and efficient.",
        aiEvaluationScore: 92,
    }],
    performance: {
        taskCompletionRate: 88,
        timelySubmissionScore: 95,
        codeQuality: 92,
        peerCollabScore: 90,
    },
    mentorship: {
        latestComments: [
            { comment: "Great progress on the new feature. Consider adding more unit tests.", mentor: "Dr. Chen" },
            { comment: "Your code is clean and well-documented. Keep it up!", mentor: "Dr. Chen" }
        ],
        aiSummary: {
            strengths: "Proactive, quick learner, strong problem-solving skills.",
            improvements: "Focus on edge-case testing and performance optimization."
        }
    },
    futureGoals: {
        careerGoals: "To become a Senior Cloud AI Engineer, specializing in building and deploying large-scale intelligent systems.",
        aiRecommendation: {
            title: "Cloud DevOps Pathway",
            description: "Your skills in Docker and interest in AI make you a great fit for a DevOps role focusing on MLOps."
        }
    },
    roleSpecific: {
      university: "State University",
      major: "Computer Science",
      graduationYear: "2025",
      experience: "3-5 years",
      methodologies: "Scrum, Kanban",
      teamSize: "8",
      department: "Engineering"
    }
  };
