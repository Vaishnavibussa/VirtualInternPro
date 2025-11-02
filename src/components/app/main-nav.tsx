
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  BarChart3,
  LifeBuoy,
  FileText,
  FileCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const mainLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/mentorship", label: "Mentorship", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/portfolio", label: "Portfolio", icon: FileCode },
];

const bottomLinks = [
  { href: "/help", label: "Help & Support", icon: LifeBuoy },
];

type MainNavProps = {
  isMobile?: boolean;
  onLinkClick?: () => void;
};

export function MainNav({ isMobile = false, onLinkClick }: MainNavProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  if (isMobile) {
      return (
          <nav className="grid gap-2 text-lg font-medium p-4">
              {mainLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                        pathname.startsWith(link.href) && "text-primary bg-muted"
                    )}
                    onClick={handleLinkClick}
                >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                </Link>
              ))}
               <div className="my-4 border-t border-border"></div>
                {bottomLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith(link.href) && "text-primary bg-muted"
                        )}
                        onClick={handleLinkClick}
                    >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                    </Link>
                ))}
          </nav>
      )
  }

  return (
    <nav className="flex flex-col gap-2 text-sm font-medium w-full">
        <TooltipProvider>
            {mainLinks.map((link) => (
                <Tooltip key={link.href} delayDuration={0}>
                    <TooltipTrigger asChild>
                        <Link
                            href={link.href}
                            className={cn(
                                "flex items-center justify-start gap-4 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                                pathname.startsWith(link.href) && "text-primary bg-muted"
                            )}
                            onClick={handleLinkClick}
                        >
                            <link.icon className="h-5 w-5 shrink-0" />
                            <span className="sr-only group-hover:not-sr-only group-hover:opacity-100 transition-opacity duration-200 delay-150">{link.label}</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="group-hover:hidden">
                        <p>{link.label}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
        </TooltipProvider>
    </nav>
  );
}
