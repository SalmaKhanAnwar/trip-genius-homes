
import React from 'react';
import { Sliders } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface FilterToggleProps {
  filters?: {
    remoteWork?: boolean;
  };
  onFilterChange?: (filterType: string, value: boolean) => void;
}

const FilterToggle: React.FC<FilterToggleProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="border-b border-airbnb-border py-3 px-6 md:px-10 lg:px-20 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-full text-sm">
          <Sliders className="h-4 w-4" />
          <span>Filters</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="remote-work" 
            checked={filters?.remoteWork || false}
            onCheckedChange={(checked) => onFilterChange?.('remoteWork', checked)}
          />
          <label htmlFor="remote-work" className="text-sm cursor-pointer">Remote Work Friendly</label>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch id="include-taxes" />
        <label htmlFor="include-taxes" className="text-sm cursor-pointer">Display total before taxes</label>
      </div>
    </div>
  );
};

export default FilterToggle;
