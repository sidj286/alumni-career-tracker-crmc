import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { OverviewDashboard } from './dashboards/OverviewDashboard';
import { AlumniManagement } from './dashboards/AlumniManagement';
import { DepartmentAnalytics } from './dashboards/DepartmentAnalytics';
import { CurriculumSuggestions } from './dashboards/CurriculumSuggestions';
import { UserManagement } from './dashboards/UserManagement';
import { Reports } from './dashboards/Reports';

export function Dashboard({ onLogout }) {
  const [activeView, setActiveView] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <OverviewDashboard />;
      case 'alumni':
        return <AlumniManagement />;
      case 'analytics':
        return <DepartmentAnalytics />;
      case 'curriculum':
        return <CurriculumSuggestions />;
      case 'users':
        return <UserManagement />;
      case 'reports':
        return <Reports />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={onLogout} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}