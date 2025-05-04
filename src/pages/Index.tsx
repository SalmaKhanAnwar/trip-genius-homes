
import React, { useState } from 'react';
import Header from '@/components/Header';
import CategoryTabs from '@/components/CategoryTabs';
import PropertyGrid from '@/components/PropertyGrid';
import FilterToggle from '@/components/FilterToggle';
import Footer from '@/components/Footer';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filters, setFilters] = useState({
    remoteWorkOnly: false,
    showVirtualTours: false,
    showSuperhost: false,
    flexibleDates: false
  });

  const handleFilterChange = (filterType: string, value: boolean) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType === 'remoteWork' ? 'remoteWorkOnly' : filterType]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <CategoryTabs 
          selectedLocation={selectedLocation} 
          onLocationChange={setSelectedLocation} 
        />
        <FilterToggle 
          filters={{ 
            remoteWork: filters.remoteWorkOnly,
            showVirtualTours: filters.showVirtualTours,
            showSuperhost: filters.showSuperhost,
            flexibleDates: filters.flexibleDates
          }} 
          onFilterChange={handleFilterChange}
        />
        <PropertyGrid 
          selectedLocation={selectedLocation}
          filters={filters}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
