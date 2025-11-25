import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { RegistrationPage } from './components/RegistrationPage';
import { Dashboard } from './components/Dashboard';
import { UserProvider } from './contexts/UserContext';
import { AlumniProvider } from './contexts/AlumniContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
    <UserProvider>
      <AlumniProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          {!isAuthenticated ? (
            showRegister ? (
              <RegistrationPage 
                onRegister={() => setShowRegister(false)}
                onBackToLogin={() => setShowRegister(false)}
              />
            ) : (
              <LoginPage 
                onLogin={handleLogin}
                onShowRegister={() => setShowRegister(true)}
              />
            )
          ) : (
            <Dashboard onLogout={handleLogout} />
          )}
        </div>
      </AlumniProvider>
    </UserProvider>
  );
}

export default App;