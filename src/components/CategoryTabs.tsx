
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

const locations = [
  { name: "All Locations", value: "" },
  { name: "Lonavala", value: "Lonavala" },
  { name: "Karjat", value: "Karjat" },
  { name: "Alibag", value: "Alibag" },
  { name: "Kashid", value: "Kashid" },
  { name: "Anjuna", value: "Anjuna" },
  { name: "Panchgani", value: "Panchgani" },
  { name: "Mumbai", value: "Mumbai" },
  { name: "Kamshet", value: "Kamshet" }
];

const CategoryTabs: React.FC<CategoryTabsProps> = ({ selectedLocation, onLocationChange }) => {
  return (
    <div className="border-b border-airbnb-border py-4 px-6 md:px-10 lg:px-20 overflow-x-auto">
      <Tabs defaultValue={selectedLocation} onValueChange={onLocationChange}>
        <TabsList className="bg-transparent h-full flex space-x-8">
          {locations.map((location) => (
            <TabsTrigger 
              key={location.value} 
              value={location.value}
              className="px-1 py-2 data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-sm">{location.name}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
