import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const progressData = [
  { month: "Jan", classAverage: 78, topPerformers: 92, strugglingStudents: 65 },
  { month: "Feb", classAverage: 81, topPerformers: 94, strugglingStudents: 68 },
  { month: "Mar", classAverage: 83, topPerformers: 95, strugglingStudents: 72 },
  { month: "Apr", classAverage: 85, topPerformers: 96, strugglingStudents: 75 },
  { month: "May", classAverage: 87, topPerformers: 97, strugglingStudents: 78 },
  { month: "Jun", classAverage: 89, topPerformers: 98, strugglingStudents: 82 },
];

export function StudentProgressTrend() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Student Progress Trend</CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly progress tracking for different student groups
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[50, 100]}
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
            <Line 
              type="monotone" 
              dataKey="topPerformers" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={3}
              name="Top Performers"
              dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="classAverage" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={3}
              name="Class Average"
              dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="strugglingStudents" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={3}
              name="Struggling Students"
              dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}