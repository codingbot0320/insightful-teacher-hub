import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const topStudents = [
  { id: 1, name: "Emma Johnson", grade: "A+", score: 98, subject: "Mathematics", trend: "up" },
  { id: 2, name: "Michael Chen", grade: "A+", score: 97, subject: "Physics", trend: "up" },
  { id: 3, name: "Sarah Williams", grade: "A", score: 95, subject: "Chemistry", trend: "stable" },
  { id: 4, name: "David Brown", grade: "A", score: 94, subject: "Biology", trend: "up" },
  { id: 5, name: "Lisa Davis", grade: "A", score: 93, subject: "Mathematics", trend: "up" },
];

interface TopStudentsTableProps {
  onStudentClick?: (studentId: number) => void;
}

export function TopStudentsTable({ onStudentClick }: TopStudentsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Top Performing Students</CardTitle>
        <p className="text-sm text-muted-foreground">
          Highest achievers across all subjects this month
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topStudents.map((student, index) => (
            <div 
              key={student.name} 
              className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors cursor-pointer"
              onClick={() => onStudentClick?.(student.id)}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {index + 1}
              </div>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-accent text-accent-foreground">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{student.name}</h4>
                <p className="text-sm text-muted-foreground">{student.subject}</p>
              </div>
              <div className="text-right">
                <Badge 
                  variant={student.grade.includes('+') ? 'default' : 'secondary'}
                  className="mb-1"
                >
                  {student.grade}
                </Badge>
                <p className="text-sm font-bold text-foreground">{student.score}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}