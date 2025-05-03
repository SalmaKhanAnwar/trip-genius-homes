
import React from 'react';
import PropertyCard from './PropertyCard';
import { useProperties, Property } from '@/hooks/use-properties';

interface PropertyGridProps {
  selectedLocation: string;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ selectedLocation }) => {
  const { properties, loading, error } = useProperties(selectedLocation);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-airbnb-pink"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>No properties found for this location.</p>
      </div>
    );
  }

  const formatPropertyData = (property: Property) => {
    // Format dates for display
    const fromDate = property.availableFrom ? new Date(property.availableFrom).getDate() : 5;
    const toDate = property.availableTo ? new Date(property.availableTo).getDate() : 10;
    const fromMonth = property.availableFrom ? new Date(property.availableFrom).toLocaleString('default', { month: 'short' }) : 'May';
    const toMonth = property.availableTo ? new Date(property.availableTo).toLocaleString('default', { month: 'short' }) : 'May';
    
    // Calculate number of nights
    const from = property.availableFrom ? new Date(property.availableFrom) : new Date();
    const to = property.availableTo ? new Date(property.availableTo) : new Date();
    to.setDate(to.getDate() + 5); // Default to 5 nights if dates are missing
    const nights = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate total price
    const totalPrice = `${property.pricePerNight * nights}`;
    
    return {
      id: property.id,
      images: [
        property.imageUrl,
        property.imageUrl, // Using the same image multiple times for demo
        property.imageUrl
      ],
      location: property.location,
      distance: property.distance || '60 kilometres',
      dates: `${fromDate}-${toDate} ${fromMonth === toMonth ? fromMonth : `${fromMonth}-${toMonth}`}`,
      price: totalPrice,
      currency: '₹',
      nights: nights,
      rating: property.rating || 4.5,
      isFavorite: false
    };
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 px-6 md:px-10 lg:px-20 py-8">
      {properties.map((property) => {
        const propertyData = formatPropertyData(property);
        return (
          <PropertyCard
            key={property.id}
            images={propertyData.images}
            location={propertyData.location}
            distance={propertyData.distance}
            dates={propertyData.dates}
            price={propertyData.price}
            currency={propertyData.currency}
            nights={propertyData.nights}
            rating={propertyData.rating}
            isFavorite={propertyData.isFavorite}
          />
        );
      })}
    </div>
  );
};

export default PropertyGrid;
