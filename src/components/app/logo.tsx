import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, isMobile = false }: { className?: string, isMobile?: boolean }) {
  const spanClasses = isMobile 
    ? "whitespace-nowrap"
    : "whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-150";

  return (
    <div className={cn("flex items-center gap-3 font-headline text-xl font-bold text-foreground overflow-hidden h-10", className)}>
      <div className="p-2.5 rounded-lg shrink-0 bg-primary text-primary-foreground">
        <Briefcase className="h-5 w-5" />
      </div>
      <span className={spanClasses}>
        CorporateIntern
      </span>
    </div>
  );
}
