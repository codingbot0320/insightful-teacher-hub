import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const performanceData = [
  { subject: "Math", average: 85, excellent: 92, needsImprovement: 78 },
  { subject: "Physics", average: 88, excellent: 95, needsImprovement: 82 },
  { subject: "Chemistry", average: 82, excellent: 89, needsImprovement: 75 },
  { subject: "Biology", average: 86, excellent: 93, needsImprovement: 79 },
];

export function StudentPerformanceChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Student Performance by Subject</CardTitle>
        <p className="text-sm text-muted-foreground">
          Comparative analysis of student scores across different subjects
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="subject" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))"
              }}
            />
            <Legend />
            <Bar 
              dataKey="excellent" 
              fill="hsl(var(--chart-2))" 
              name="Excellent (90+)"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="average" 
              fill="hsl(var(--chart-1))" 
              name="Average (80-89)"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="needsImprovement" 
              fill="hsl(var(--chart-3))" 
              name="Needs Improvement (<80)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}