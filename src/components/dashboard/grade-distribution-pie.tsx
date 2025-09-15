import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const gradeData = [
  { name: "A (90-100)", value: 28, color: "hsl(var(--chart-2))" },
  { name: "B (80-89)", value: 35, color: "hsl(var(--chart-1))" },
  { name: "C (70-79)", value: 22, color: "hsl(var(--chart-3))" },
  { name: "D (60-69)", value: 12, color: "hsl(var(--chart-4))" },
  { name: "F (<60)", value: 3, color: "hsl(var(--destructive))" },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="600"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function GradeDistributionPie() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Grade Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">
          Overall grade distribution across all students
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={gradeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {gradeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))"
              }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "12px"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}