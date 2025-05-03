
import React, { useState } from 'react';
import Header from '@/components/Header';
import CategoryTabs from '@/components/CategoryTabs';
import PropertyGrid from '@/components/PropertyGrid';
import FilterToggle from '@/components/FilterToggle';
import Footer from '@/components/Footer';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [remoteWorkOnly, setRemoteWorkOnly] = useState(false);

  const handleFilterChange = (filterType: string, value: boolean) => {
    if (filterType === 'remoteWork') {
      setRemoteWorkOnly(value);
    }
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
          filters={{ remoteWork: remoteWorkOnly }} 
          onFilterChange={handleFilterChange}
        />
        <PropertyGrid 
          selectedLocation={selectedLocation}
          filters={{ remoteWorkOnly }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
