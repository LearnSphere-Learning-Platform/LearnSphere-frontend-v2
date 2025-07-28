import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function getUserRole() {
  const username = localStorage.getItem('username');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const isInstructor = localStorage.getItem('isInstructor') === 'true';
  console.log('RoleRoute Debug:', { username, isAuthenticated, isInstructor });
  
  // If not authenticated, redirect to login
  if (!isAuthenticated || !username) {
    return 'unauthenticated';
  }
  
  // Check for admin role - either username is 'admin' or email is 'admin@learnsphere.com'
  if (username === 'admin' || username === 'admin@learnsphere.com') return 'admin';
  if (isInstructor) return 'instructor';
  return 'student';
}

const RoleRoute = ({ allowedRoles }) => {
  const userRole = getUserRole();
  console.log('RoleRoute Check:', { userRole, allowedRoles, isAllowed: allowedRoles.includes(userRole) });
  
  if (userRole === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }
  
  // Admin users have access to everything, so they should never see "not-authorized"
  if (userRole === 'admin') {
    return <Outlet />;
  }
  
  // Check if user has access to the requested route
  if (allowedRoles.includes(userRole)) {
    return <Outlet />;
  }
  
  // If instructor tries to access admin-only routes, show not-authorized
  if (userRole === 'instructor' && allowedRoles.includes('admin')) {
    return <Navigate to="/not-authorized" replace />;
  }
  
  // For other cases, redirect to not-authorized
  return <Navigate to="/not-authorized" replace />;
};

export default RoleRoute; 