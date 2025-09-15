interface Subject {
  name: string;
  score: number;
  grade: string;
  trend: string;
}

interface MonthlyProgress {
  month: string;
  math: number;
  physics: number;
  chemistry: number;
  biology: number;
}

interface StudentData {
  id: number;
  name: string;
  email: string;
  grade: string;
  overallGPA: number;
  subjects: Subject[];
  monthlyProgress: MonthlyProgress[];
  strengths: string[];
  improvements: string[];
  attendance: number;
  assignments: {
    completed: number;
    total: number;
  };
  lastUpdated: string;
}

export function generateStudentReport(student: StudentData) {
  const completionRate = Math.round((student.assignments.completed / student.assignments.total) * 100);
  const averageScore = Math.round(student.subjects.reduce((sum, subject) => sum + subject.score, 0) / student.subjects.length);
  
  // Calculate improvement trend
  const firstMonth = student.monthlyProgress[0];
  const lastMonth = student.monthlyProgress[student.monthlyProgress.length - 1];
  const overallImprovement = {
    math: lastMonth.math - firstMonth.math,
    physics: lastMonth.physics - firstMonth.physics,
    chemistry: lastMonth.chemistry - firstMonth.chemistry,
    biology: lastMonth.biology - firstMonth.biology
  };

  return {
    reportMetadata: {
      studentName: student.name,
      studentId: student.id,
      reportDate: new Date().toISOString(),
      academicYear: "2023-2024",
      reportType: "Comprehensive Performance Report"
    },
    studentInfo: {
      name: student.name,
      email: student.email,
      grade: student.grade,
      overallGPA: student.overallGPA,
      lastUpdated: student.lastUpdated
    },
    performanceSummary: {
      averageScore: averageScore,
      attendanceRate: student.attendance,
      assignmentCompletionRate: completionRate,
      totalAssignments: student.assignments.total,
      completedAssignments: student.assignments.completed
    },
    subjectPerformance: student.subjects.map(subject => ({
      ...subject,
      performanceLevel: subject.score >= 90 ? "Excellent" : subject.score >= 80 ? "Good" : subject.score >= 70 ? "Satisfactory" : "Needs Improvement"
    })),
    progressTrend: {
      monthlyData: student.monthlyProgress,
      improvements: overallImprovement,
      trendAnalysis: {
        math: overallImprovement.math > 5 ? "Strong Improvement" : overallImprovement.math > 0 ? "Steady Progress" : "Needs Attention",
        physics: overallImprovement.physics > 5 ? "Strong Improvement" : overallImprovement.physics > 0 ? "Steady Progress" : "Needs Attention",
        chemistry: overallImprovement.chemistry > 5 ? "Strong Improvement" : overallImprovement.chemistry > 0 ? "Steady Progress" : "Needs Attention",
        biology: overallImprovement.biology > 5 ? "Strong Improvement" : overallImprovement.biology > 0 ? "Steady Progress" : "Needs Attention"
      }
    },
    strengths: student.strengths,
    areasForImprovement: student.improvements,
    recommendations: generateRecommendations(student),
    nextSteps: generateNextSteps(student)
  };
}

function generateRecommendations(student: StudentData): string[] {
  const recommendations: string[] = [];
  
  // Based on attendance
  if (student.attendance < 90) {
    recommendations.push("Focus on improving attendance to maintain consistent learning progress");
  }
  
  // Based on assignment completion
  const completionRate = (student.assignments.completed / student.assignments.total) * 100;
  if (completionRate < 90) {
    recommendations.push("Work on completing all assignments to reinforce learning concepts");
  }
  
  // Based on subject performance
  student.subjects.forEach(subject => {
    if (subject.score < 80) {
      recommendations.push(`Additional support recommended for ${subject.name} - consider tutoring or extra practice`);
    } else if (subject.score >= 95) {
      recommendations.push(`Excellent performance in ${subject.name} - consider advanced coursework or mentoring others`);
    }
  });
  
  // Based on trends
  student.subjects.forEach(subject => {
    if (subject.trend === "down") {
      recommendations.push(`Monitor ${subject.name} performance closely as recent trend shows decline`);
    }
  });
  
  return recommendations.length > 0 ? recommendations : ["Continue current study habits and maintain excellent performance"];
}

function generateNextSteps(student: StudentData): string[] {
  const nextSteps: string[] = [];
  
  // General next steps
  nextSteps.push("Schedule regular check-ins with teachers for feedback");
  nextSteps.push("Set specific academic goals for the next quarter");
  
  // Subject-specific next steps
  const lowestSubject = student.subjects.reduce((min, subject) => 
    subject.score < min.score ? subject : min
  );
  
  if (lowestSubject.score < 85) {
    nextSteps.push(`Focus additional study time on ${lowestSubject.name}`);
    nextSteps.push(`Consider forming study groups for ${lowestSubject.name}`);
  }
  
  // Based on strengths
  if (student.strengths.includes("Problem Solving")) {
    nextSteps.push("Consider participating in academic competitions or advanced problem-solving activities");
  }
  
  return nextSteps;
}