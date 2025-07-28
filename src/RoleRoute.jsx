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
  
  // Admin has full access to everything
  if (userRole === 'admin') {
    return <Outlet />;
  }
  
  // Check if user has access to the requested route
  if (allowedRoles.includes(userRole)) {
    return <Outlet />;
  }
  
  // User (student) trying to access instructor or admin routes
  if (userRole === 'student' && (allowedRoles.includes('instructor') || allowedRoles.includes('admin'))) {
    return <Navigate to="/not-authorized" replace />;
  }
  
  // Instructor trying to access admin-only routes
  if (userRole === 'instructor' && allowedRoles.includes('admin')) {
    return <Navigate to="/not-authorized" replace />;
  }
  
  // For any other unauthorized access
  return <Navigate to="/not-authorized" replace />;
};

export default RoleRoute; 