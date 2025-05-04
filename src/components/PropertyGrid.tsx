
import React from 'react';
import PropertyCard from './PropertyCard';
import { useProperties, Property } from '@/hooks/use-properties';

interface PropertyGridProps {
  selectedLocation: string;
  filters?: {
    remoteWorkOnly?: boolean;
    showVirtualTours?: boolean;
    showSuperhost?: boolean;
    flexibleDates?: boolean;
  };
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ selectedLocation, filters }) => {
  const { properties, loading, error } = useProperties(selectedLocation, filters);

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
        <p>No properties found for this location and filters.</p>
      </div>
    );
  }

  // Helper function to get random images from Unsplash
  const getRandomImages = (seed: string) => {
    const travelImages = [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
      'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b',
      'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
      'https://images.unsplash.com/photo-1496307653780-42ee777d4833'
    ];
    
    const interiorImages = [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
      'https://images.unsplash.com/photo-1496307653780-42ee777d4833',
      'https://images.unsplash.com/photo-1431576901776-e539bd916ba2',
      'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e',
      'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace',
      'https://images.unsplash.com/photo-1460574283810-2aab119d8511',
      'https://images.unsplash.com/photo-1439337153520-7082a56a81f4',
      'https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a',
      'https://images.unsplash.com/photo-1473177104440-ffee2f376098',
      'https://images.unsplash.com/photo-1551038247-3d9af20df552'
    ];
    
    // Use property id to generate pseudo-random but consistent images
    const charCode = seed.charCodeAt(0);
    const mainIndex = charCode % travelImages.length;
    
    // Generate 3-5 images for each property
    const numberOfImages = 3 + (charCode % 3); // 3-5 images
    const images = [travelImages[mainIndex]];
    
    for (let i = 1; i < numberOfImages; i++) {
      const useInterior = i % 2 === 0;
      const arrayToUse = useInterior ? interiorImages : travelImages;
      const idx = (charCode * i) % arrayToUse.length;
      images.push(arrayToUse[idx]);
    }
    
    return images;
  };

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
    
    // Determine if property has enhanced features based on ID
    const hasVirtualTour = property.id.charAt(0) === 'a' || property.id.charAt(0) === 'b';
    const arExperienceAvailable = property.id.charAt(1) === 'c' || property.id.charAt(1) === 'd';
    const hostVerified = property.id.charAt(2) === 'e' || property.id.charAt(2) === 'f';
    const guestCapacity = 2 + (property.id.charCodeAt(0) % 8); // 2-10 guests
    
    return {
      id: property.id,
      images: getRandomImages(property.id),
      location: property.location,
      distance: property.distance || '60 kilometres',
      dates: `${fromDate}-${toDate} ${fromMonth === toMonth ? fromMonth : `${fromMonth}-${toMonth}`}`,
      price: totalPrice,
      currency: '₹',
      nights: nights,
      rating: property.rating || 4.5,
      isFavorite: false,
      hasVirtualTour: hasVirtualTour,
      isRemoteWorkFriendly: property.remoteWorkFriendly,
      arExperienceAvailable: arExperienceAvailable,
      hostVerified: hostVerified,
      guestCapacity: guestCapacity
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
            hasVirtualTour={propertyData.hasVirtualTour}
            isRemoteWorkFriendly={propertyData.isRemoteWorkFriendly}
            arExperienceAvailable={propertyData.arExperienceAvailable}
            hostVerified={propertyData.hostVerified}
            guestCapacity={propertyData.guestCapacity}
          />
        );
      })}
    </div>
  );
};

export default PropertyGrid;
