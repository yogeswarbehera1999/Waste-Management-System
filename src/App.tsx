import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CitizenDashboard from './components/CitizenDashboard';
import SupervisorDashboard from './components/SupervisorDashboard';
import AdminDashboard from './components/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route 
              path="/citizen" 
              element={
                <ProtectedRoute role="citizen">
                  <CitizenDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/supervisor" 
              element={
                <ProtectedRoute role="supervisor">
                  <SupervisorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;