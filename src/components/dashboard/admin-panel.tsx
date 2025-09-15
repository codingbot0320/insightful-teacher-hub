import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  Mail, 
  Settings,
  Users,
  Calendar,
  BarChart3
} from "lucide-react";

const adminActions = [
  {
    title: "Generate Report",
    description: "Download comprehensive analytics report",
    icon: FileText,
    action: "report",
    variant: "default" as const
  },
  {
    title: "Export Data",
    description: "Export student data to CSV/Excel",
    icon: Download,
    action: "export",
    variant: "outline" as const
  },
  {
    title: "Send Notifications",
    description: "Send updates to students/parents",
    icon: Mail,
    action: "notify",
    variant: "outline" as const
  },
  {
    title: "Manage Users",
    description: "Add/remove students and teachers",
    icon: Users,
    action: "users",
    variant: "outline" as const
  }
];

const quickStats = [
  { label: "Reports Generated", value: "47", period: "This Month" },
  { label: "Data Exports", value: "12", period: "This Week" },
  { label: "Active Sessions", value: "156", period: "Right Now" },
  { label: "System Uptime", value: "99.9%", period: "Last 30 Days" }
];

export function AdminPanel() {
  const handleAdminAction = (action: string) => {
    switch (action) {
      case 'report':
        // Simulate report generation
        const reportData = {
          title: 'Student Analytics Report',
          date: new Date().toLocaleDateString(),
          students: 1234,
          averageScore: 87.5
        };
        
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `student-report-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        break;
      case 'export':
        // Simulate CSV export
        const csvContent = `Student Name,Grade,Score,Subject
Emma Johnson,A+,98,Mathematics
Michael Chen,A+,97,Science
Sarah Williams,A,95,English
David Brown,A,94,History
Lisa Davis,A,93,Geography`;
        
        const csvDataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
        const csvLink = document.createElement('a');
        csvLink.setAttribute('href', csvDataUri);
        csvLink.setAttribute('download', `students-export-${new Date().toISOString().split('T')[0]}.csv`);
        csvLink.click();
        break;
      default:
        console.log(`Admin action: ${action}`);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Admin Control Panel
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage reports, exports, and system settings
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adminActions.map((action) => {
              const Icon = action.icon;
              return (
                <div key={action.action} className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{action.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                      <Button 
                        variant={action.variant}
                        size="sm"
                        onClick={() => handleAdminAction(action.action)}
                        className="w-full"
                      >
                        Execute
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Quick Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((stat) => (
              <div key={stat.label} className="text-center p-3 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.period}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}