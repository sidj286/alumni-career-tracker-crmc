import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage.jsx';
import { Dashboard } from './components/Dashboard.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import { AlumniProvider } from './contexts/AlumniContext.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userInfo');
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <UserProvider>
        <AlumniProvider>
          {!isAuthenticated ? (
            <LoginPage onLogin={handleLogin} />
          ) : (
            <Dashboard onLogout={handleLogout} />
          )}
        </AlumniProvider>
      </UserProvider>
    </div>
  );
}

export default App;