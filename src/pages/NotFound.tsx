
import React from 'react';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <svg 
            viewBox="0 0 32 32" 
            xmlns="http://www.w3.org/2000/svg" 
            aria-hidden="true" 
            role="presentation" 
            focusable="false" 
            className="mx-auto h-16 w-16 text-airbnb-pink"
            style={{ fill: 'currentColor' }}
          >
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.751.568 3.273-.202 4.523-.773 1.256-2.07 2.052-3.986 2.43-.577.115-1.546.277-2.592-.009l-.122-.04c-1.908-.616-4.564-2.778-6.887-6.431a1.443 1.443 0 0 1-.13-.24.88.88 0 0 0-1.333 0 1.446 1.446 0 0 1-.122.213c-2.31 3.624-4.954 5.777-6.85 6.389l-.121.038c-1.046.286-2.015.124-2.592.009-1.916-.378-3.213-1.174-3.985-2.43-.771-1.25-.87-2.772-.202-4.523l.145-.353c.98-2.276 5.114-10.93 7.094-14.83l.54-1.032C12.537 1.963 13.992 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.21l-.523 1.008c-1.926 3.776-6.06 12.43-7.031 14.692l-.345.836c-.427 1.071-.325 1.82.151 2.548.56.853 1.424 1.439 2.709 1.73.432.09 1.01.163 1.704.027 1.297-.418 3.355-2.165 5.33-5.235a3.108 3.108 0 0 0 .38-.699.882.882 0 0 1 1.243 0c.148.185.272.38.38.7 1.914 3.003 3.966 4.79 5.331 5.235.694.135 1.273.062 1.705-.027 1.285-.29 2.149-.876 2.709-1.73.476-.729.578-1.477.15-2.548l-.344-.836c-.97-2.262-5.105-10.916-7.032-14.692l-.522-1.007C18.053 3.539 17.24 3 16 3z"></path>
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-airbnb-darkGray mb-4">Oops! Page not found</h1>
        <p className="text-airbnb-lightGray mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button 
          className="bg-airbnb-pink hover:bg-airbnb-pink/90 text-white flex items-center gap-2"
          onClick={() => window.location.href = '/'}
        >
          <Home size={18} />
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
