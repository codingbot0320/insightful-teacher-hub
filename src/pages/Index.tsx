import { useState } from "react";
import { NavSidebar } from "@/components/ui/nav-sidebar";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { StudentPerformanceChart } from "@/components/dashboard/student-performance-chart";
import { GradeDistributionPie } from "@/components/dashboard/grade-distribution-pie";
import { StudentProgressTrend } from "@/components/dashboard/student-progress-trend";
import { TopStudentsTable } from "@/components/dashboard/top-students-table";
import { StudentDetailsModal } from "@/components/dashboard/student-details-modal";
import { AdminPanel } from "@/components/dashboard/admin-panel";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  const handleStudentClick = (studentId: number) => {
    setSelectedStudentId(studentId);
    setIsStudentModalOpen(true);
  };

  const handleCloseStudentModal = () => {
    setIsStudentModalOpen(false);
    setSelectedStudentId(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back! Here's what's happening with your students.</p>
              </div>
              <div className="flex gap-2">
                
                
              </div>
            </div>
            <OverviewCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <StudentPerformanceChart />
              <GradeDistributionPie />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <StudentProgressTrend />
              <TopStudentsTable onStudentClick={handleStudentClick} />
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StudentPerformanceChart />
              <GradeDistributionPie />
              <StudentProgressTrend />
            </div>
          </div>
        );
      case "students":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
            <TopStudentsTable onStudentClick={handleStudentClick} />
          </div>
        );
      case "performance":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Performance Analysis</h1>
            <StudentProgressTrend />
            <StudentPerformanceChart />
          </div>
        );
      case "reports":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <AdminPanel />
          </div>
        );
      case "charts":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Data Visualizations</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GradeDistributionPie />
              <StudentPerformanceChart />
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <AdminPanel />
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <OverviewCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <StudentPerformanceChart />
              <GradeDistributionPie />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <NavSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
      <StudentDetailsModal 
        isOpen={isStudentModalOpen}
        onClose={handleCloseStudentModal}
        studentId={selectedStudentId}
      />
    </div>
  );
};

export default Index;
