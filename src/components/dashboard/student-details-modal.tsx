import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Download, TrendingUp, TrendingDown, User, BookOpen, Calendar, Award } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { generateStudentReport } from "@/lib/student-report-generator";

interface StudentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: number | null;
}

// Mock student data - in real app, this would come from API
const getStudentData = (id: number) => {
  const students = {
    1: {
      id: 1,
      name: "Praveen Kumar",
      email: "Praveen@school.edu",
      grade: "8th Grade",
      Percentage: 98,
      subjects: [
        { name: "Math", score: 98, grade: "A+", trend: "up" },
        { name: "Physics", score: 95, grade: "A", trend: "up" },
        { name: "Chemistry", score: 92, grade: "A-", trend: "stable" },
        { name: "Biology", score: 89, grade: "B+", trend: "up" }
      ],
      monthlyProgress: [
        { month: "Jan", math: 85, physics: 87, chemistry: 83, biology: 81 },
        { month: "Feb", math: 88, physics: 89, chemistry: 85, biology: 84 },
        { month: "Mar", math: 92, physics: 91, chemistry: 88, biology: 86 },
        { month: "Apr", math: 95, physics: 93, chemistry: 90, biology: 88 },
        { month: "May", math: 98, physics: 95, chemistry: 92, biology: 89 }
      ],
      strengths: ["Problem Solving", "Mathematical Reasoning", "Scientific Method"],
      improvements: ["Time Management", "Essay Writing"],
      attendance: 96,
      assignments: { completed: 45, total: 47 },
      lastUpdated: "2024-01-15"
    },
    2: {
      id: 2,
      name: "Rohit Pawar",
      email: "Rohit@school.edu",
      grade: "9th Grade",
      Percentage: 94,
      subjects: [
        { name: "Math", score: 94, grade: "A", trend: "stable" },
        { name: "Physics", score: 97, grade: "A+", trend: "up" },
        { name: "Chemistry", score: 91, grade: "A-", trend: "up" },
        { name: "Biology", score: 88, grade: "B+", trend: "stable" }
      ],
      monthlyProgress: [
        { month: "Jan", math: 88, physics: 90, chemistry: 85, biology: 83 },
        { month: "Feb", math: 90, physics: 92, chemistry: 87, biology: 85 },
        { month: "Mar", math: 92, physics: 94, chemistry: 89, biology: 87 },
        { month: "Apr", math: 93, physics: 96, chemistry: 90, biology: 88 },
        { month: "May", math: 94, physics: 97, chemistry: 91, biology: 88 }
      ],
      strengths: ["Physics Concepts", "Laboratory Skills", "Data Analysis"],
      improvements: ["Mathematical Calculations", "Presentation Skills"],
      attendance: 94,
      assignments: { completed: 46, total: 47 },
      lastUpdated: "2024-01-15"
    },
    3: {
      id: 3,
      name: "Ananya Sharma",
      email: "ananya@school.edu",
      grade: "9th Grade",
      Percentage: 89,
      subjects: [
        { name: "Math", score: 91, grade: "A", trend: "stable" },
        { name: "Physics", score: 90, grade: "A+", trend: "up" },
        { name: "Chemistry", score: 84, grade: "A", trend: "up" },
        { name: "Biology", score: 76, grade: "B+", trend: "stable" }
      ],
      monthlyProgress: [
        { month: "Jan", math: 80, physics: 90, chemistry: 85, biology: 83 },
        { month: "Feb", math: 91, physics: 92, chemistry: 87, biology: 85 },
        { month: "Mar", math: 99, physics: 94, chemistry: 89, biology: 87 },
        { month: "Apr", math: 96, physics: 96, chemistry: 90, biology: 88 },
        { month: "May", math: 85, physics: 97, chemistry: 91, biology: 88 }
      ],
      strengths: ["Physics Concepts", "Laboratory Skills", "Data Analysis"],
      improvements: ["Mathematical Calculations", "Presentation Skills"],
      attendance: 94,
      assignments: { completed: 46, total: 47 },
      lastUpdated: "2024-01-15"
    // Add more students as needed...
  },
    4: {
      id: 4,
      name: "Preeti Ghorpade",
      email: "preeti@school.edu",
      grade: "8th Grade",
      Percentage: 80,
      subjects: [
        { name: "Math", score: 67, grade: "C", trend: "stable" },
        { name: "Physics", score: 78, grade: "B+", trend: "Lower" },
        { name: "Chemistry", score: 84, grade: "A", trend: "up" },
        { name: "Biology", score: 76, grade: "B+", trend: "stable" }
      ],
      monthlyProgress: [
        { month: "Jan", math: 80, physics: 90, chemistry: 85, biology: 83 },
        { month: "Feb", math: 91, physics: 92, chemistry: 87, biology: 85 },
        { month: "Mar", math: 99, physics: 94, chemistry: 89, biology: 87 },
        { month: "Apr", math: 96, physics: 96, chemistry: 90, biology: 88 },
        { month: "May", math: 85, physics: 97, chemistry: 91, biology: 88 }
      ],
      strengths: ["Physics Concepts", "Laboratory Skills", "Data Analysis"],
      improvements: ["Mathematical Calculations", "Presentation Skills"],
      attendance: 94,
      assignments: { completed: 46, total: 47 },
      lastUpdated: "2024-01-15"
    // Add more students as needed...
  },
  5: {
      id: 5,
      name: "Deva",
      email: "deva@school.edu",
      grade: "11th Grade",
      Percentage: 92,
      subjects: [
        { name: "Math", score: 95, grade: "A+", trend: "stable" },
        { name: "Physics", score: 78, grade: "B+", trend: "Lower" },
        { name: "Chemistry", score: 65, grade: "C", trend: "Lower" },
        { name: "Biology", score: 76, grade: "B+", trend: "stable" }
      ],
      monthlyProgress: [
        { month: "Jan", math: 80, physics: 90, chemistry: 85, biology: 83 },
        { month: "Feb", math: 91, physics: 92, chemistry: 87, biology: 85 },
        { month: "Mar", math: 99, physics: 94, chemistry: 89, biology: 87 },
        { month: "Apr", math: 96, physics: 96, chemistry: 90, biology: 88 },
        { month: "May", math: 85, physics: 97, chemistry: 91, biology: 88 }
      ],
      strengths: ["Physics Concepts", "Laboratory Skills", "Data Analysis"],
      improvements: ["Mathematical Calculations", "Presentation Skills"],
      attendance: 94,
      assignments: { completed: 46, total: 47 },
      lastUpdated: "2024-01-15"
    // Add more students as needed...
  },
};
  
  return students[id as keyof typeof students] || students[1];
};

export function StudentDetailsModal({ isOpen, onClose, studentId }: StudentDetailsModalProps) {
  if (!studentId) return null;
  
  const student = getStudentData(studentId);
  
  const handleDownloadReport = () => {
    const report = generateStudentReport(student);
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${student.name.replace(/\s+/g, '-')}-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-muted-foreground">{student.grade} • GPA: {student.overallGPA}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <User className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{student.overallGPA}</div>
                <div className="text-sm text-muted-foreground">Overall GPA</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-chart-2" />
                <div className="text-2xl font-bold">{student.attendance}%</div>
                <div className="text-sm text-muted-foreground">Attendance</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-chart-3" />
                <div className="text-2xl font-bold">{student.assignments.completed}/{student.assignments.total}</div>
                <div className="text-sm text-muted-foreground">Assignments</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-chart-4" />
                <div className="text-2xl font-bold">{Math.round((student.assignments.completed / student.assignments.total) * 100)}%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Subject Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.subjects.map((subject) => (
                  <div key={subject.name} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{subject.name}</h4>
                        <Badge variant={subject.grade.includes('+') ? 'default' : 'secondary'}>
                          {subject.grade}
                        </Badge>
                        {subject.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-success" />
                        ) : subject.trend === 'down' ? (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        ) : null}
                      </div>
                      <Progress value={subject.score} className="w-full" />
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold">{subject.score}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={student.monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" domain={[70, 100]} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Line type="monotone" dataKey="math" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Math" />
                  <Line type="monotone" dataKey="physics" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Physics" />
                  <Line type="monotone" dataKey="chemistry" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Chemistry" />
                  <Line type="monotone" dataKey="biology" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Biology" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Strengths and Areas for Improvement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-success">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {student.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-warning">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {student.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span>{improvement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}