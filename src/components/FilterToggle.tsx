
import React from 'react';
import { Button } from '@/components/ui/button';

const FilterToggle: React.FC = () => {
  return (
    <div className="flex justify-between items-center py-4 px-6 md:px-10 lg:px-20">
      <Button 
        variant="outline"
        className="flex items-center gap-2 border border-gray-300 rounded-xl h-12"
      >
        <svg 
          viewBox="0 0 16 16" 
          xmlns="http://www.w3.org/2000/svg" 
          aria-hidden="true" 
          role="presentation" 
          focusable="false"
          className="w-4 h-4"
          style={{ display: 'block', fill: 'currentcolor' }}
        >
          <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
        </svg>
        Filters
      </Button>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          Display total before taxes
        </span>
        <button 
          className="relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-gray-200"
          role="switch"
        >
          <span className="pointer-events-none inline-block h-[16px] w-[16px] rounded-full bg-white shadow-lg transform ring-0 transition duration-200 ease-in-out translate-x-0" />
        </button>
      </div>
    </div>
  );
};

export default FilterToggle;
