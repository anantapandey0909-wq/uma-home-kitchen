import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Spin } from 'antd';

/**
 * Route guard component for admin protected endpoints
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Verifying access..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect them to the /admin/login page, but save the current location they were
    // trying to go to. This allows us to send them along after they login.
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
