
import React from 'react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import PropertyGrid from '@/components/PropertyGrid';
import FilterToggle from '@/components/FilterToggle';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <CategoryFilter />
        <FilterToggle />
        <PropertyGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
