import React from 'react';

const NotAuthorized = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-4xl font-bold text-red-600 mb-4">Not Authorized</h1>
    <p className="text-lg text-gray-700 mb-8">You do not have permission to view this page.</p>
    <a href="/" className="text-blue-600 hover:underline">Go to Home</a>
  </div>
);

export default NotAuthorized; 