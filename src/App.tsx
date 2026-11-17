import { useState } from 'react';
import { RoleProvider, useRole } from './context/RoleContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProgramTracking } from './components/modules/ProgramTracking';
import { QualityManagement } from './components/modules/QualityManagement';
import { SupplyChain } from './components/modules/SupplyChain';
import { AfterSales } from './components/modules/AfterSales';
import { Collaboration } from './components/modules/Collaboration';
import { LoginPage } from './components/auth/LoginPage';

function AppContent() {
  const { isAuthenticated } = useRole();
  const [activeModule, setActiveModule] = useState('Dashboard');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Program Tracking':
        return <ProgramTracking />;
      case 'Production Visibility':
        return <Dashboard />; 
      case 'Quality Management':
        return <QualityManagement />;
      case 'Supply Chain':
        return <SupplyChain />;
      case 'After-Sales':
        return <AfterSales />;
      case 'Collaboration':
        return <Collaboration />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeModule={activeModule} setActiveModule={setActiveModule}>
      {renderModule()}
    </Layout>
  );
}

function App() {
  return (
    <RoleProvider>
      <AppContent />
    </RoleProvider>
  );
}

export default App;
