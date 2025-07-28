import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBEDDF] to-[#C8CBB8] flex items-center justify-center px-4 mt-0">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-9xl font-bold text-[#333A2F] opacity-20">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-16 h-16 text-[#333A2F]" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-[#333A2F] mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Debug Info (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-3 bg-gray-100 rounded-lg text-xs text-gray-500">
            <p>Attempted URL: {location.pathname}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center gap-2 bg-[#333A2F] text-white py-3 px-6 rounded-lg hover:bg-[#2a3028] transition-colors"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full flex items-center justify-center gap-2 bg-white text-[#333A2F] py-3 px-6 rounded-lg border border-[#333A2F] hover:bg-[#EBEDDF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-sm text-gray-500">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 