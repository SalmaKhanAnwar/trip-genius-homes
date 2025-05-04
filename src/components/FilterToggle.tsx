
import React from 'react';
import { Sliders, Wifi, CreditCard, Star, Calendar } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FilterToggleProps {
  filters?: {
    remoteWork?: boolean;
    showVirtualTours?: boolean;
    showSuperhost?: boolean;
    flexibleDates?: boolean;
  };
  onFilterChange?: (filterType: string, value: boolean) => void;
}

const FilterToggle: React.FC<FilterToggleProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-airbnb-border py-3 px-6 md:px-10 lg:px-20 flex flex-col">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-4">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-full text-sm">
                <Sliders className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-2">
              <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4 text-airbnb-pink" />
                  <Switch 
                    id="remote-work" 
                    checked={filters?.remoteWork || false}
                    onCheckedChange={(checked) => onFilterChange?.('remoteWork', checked)}
                  />
                  <label htmlFor="remote-work" className="text-sm cursor-pointer">Remote Work Friendly</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-airbnb-pink" />
                  <Switch 
                    id="flexible-dates" 
                    checked={filters?.flexibleDates || false}
                    onCheckedChange={(checked) => onFilterChange?.('flexibleDates', checked)}
                  />
                  <label htmlFor="flexible-dates" className="text-sm cursor-pointer">Flexible Dates</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-airbnb-pink" />
                  <Switch 
                    id="superhost" 
                    checked={filters?.showSuperhost || false}
                    onCheckedChange={(checked) => onFilterChange?.('showSuperhost', checked)}
                  />
                  <label htmlFor="superhost" className="text-sm cursor-pointer">Superhost Only</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-airbnb-pink" />
                  <Switch 
                    id="virtual-tours" 
                    checked={filters?.showVirtualTours || false}
                    onCheckedChange={(checked) => onFilterChange?.('showVirtualTours', checked)}
                  />
                  <label htmlFor="virtual-tours" className="text-sm cursor-pointer">360° Virtual Tours</label>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
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
    </div>
  );
};

export default FilterToggle;
