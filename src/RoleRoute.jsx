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
  
  if (username === 'admin') return 'admin';
  if (isInstructor) return 'instructor';
  return 'student';
}

const RoleRoute = ({ allowedRoles }) => {
  const userRole = getUserRole();
  console.log('RoleRoute Check:', { userRole, allowedRoles, isAllowed: allowedRoles.includes(userRole) });
  
  if (userRole === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }
  
  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/not-authorized" replace />;
};

export default RoleRoute; 