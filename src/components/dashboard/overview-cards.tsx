import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, TrendingUp, Award } from "lucide-react";

const overviewData = [
  {
    title: "Total Students",
    value: "1,234",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    color: "text-chart-1"
  },
  {
    title: "Average Score",
    value: "87.5%",
    change: "+5.2%",
    changeType: "positive" as const,
    icon: Award,
    color: "text-chart-2"
  },
  {
    title: "Active Subjects",
    value: "24",
    change: "+3",
    changeType: "positive" as const,
    icon: BookOpen,
    color: "text-chart-3"
  },
  {
    title: "Progress Rate",
    value: "92.1%",
    change: "+8.1%",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "text-chart-4"
  }
];

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewData.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">
                {item.value}
              </div>
              <p className={`text-xs flex items-center gap-1 ${
                item.changeType === 'positive' ? 'text-success' : 'text-destructive'
              }`}>
                <TrendingUp className="h-3 w-3" />
                {item.change} from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}