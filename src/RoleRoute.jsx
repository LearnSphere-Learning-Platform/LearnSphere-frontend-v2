import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getRole } from './services/authService';

function getUserRole() {
  // reads the role from the real JWT (ADMIN / INSTRUCTOR / STUDENT)
  const role = getRole();
  if (!role) {
    return 'unauthenticated';
  }
  return role.toLowerCase();
}

const RoleRoute = ({ allowedRoles }) => {
  const userRole = getUserRole();

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
