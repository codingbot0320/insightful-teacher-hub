import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  Settings, 
  FileText, 
  PieChart,
  Download,
  Home,
  TrendingUp,
  GraduationCap
} from "lucide-react";

interface NavSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "students", label: "Students", icon: Users },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "charts", label: "Charts", icon: PieChart },
  { id: "subjects", label: "Subjects", icon: BookOpen },
  { id: "settings", label: "Settings", icon: Settings },
];

export function NavSidebar({ activeTab, onTabChange, className }: NavSidebarProps) {
  return (
    <div className={cn("w-64 bg-card border-r border-border h-full", className)}>
     <div className="flex items-center">
              <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#415A77] to-[#778DA9] rounded-full flex items-center justify-center animate-pulse">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <a className="text-2xl font-bold bg-gradient-to-r from-[#778DA9] to-[#E0E1DD] bg-clip-text text-transparent" href="http://localhost:5175/">
                Gyaan Sagar
              </a>
            </div>
      </div>
      
      <ScrollArea className="h-full">
        <div className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11",
                  activeTab === item.id 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "hover:bg-secondary/80"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}