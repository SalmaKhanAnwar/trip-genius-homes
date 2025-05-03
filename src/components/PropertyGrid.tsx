
import React from 'react';
import PropertyCard from './PropertyCard';

const PropertiesMockData = [
  {
    id: 1,
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-26300485/original/ee94e6c1-6ebc-496d-8d77-3a1b672ddc22.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-26300485/original/e1eb235b-f35b-4e1c-a7ea-96229aca64b7.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-26300485/original/57d978a0-2189-4974-8136-9ffe1671ebf4.jpeg'
    ],
    location: 'Lonavala, India',
    distance: '63 kilometres',
    dates: '5-10 May',
    price: '₹28,529',
    nights: 5,
    rating: 4.94,
    isFavorite: true
  },
  {
    id: 2,
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-820950793239599238/original/46a1da19-6653-4f48-8b97-bf0aefd26b28.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-820950793239599238/original/5b7c1b4e-eb78-4f0b-a815-da58de6f2c74.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-820950793239599238/original/a5390ffe-17f1-4dbd-957e-e438d032ec55.jpeg'
    ],
    location: 'Karjat, India',
    distance: '74 kilometres',
    dates: '1-6 May',
    price: '₹42,529',
    nights: 5,
    rating: 4.86,
    isFavorite: false
  },
  {
    id: 3,
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-13908417/original/86128aef-6dce-4405-b22c-da5a660daf27.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-13908417/original/dd489918-9a0c-47c6-b50f-d7269888a093.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-13908417/original/71c7e788-c8b8-447e-848d-acd39d3d134f.jpeg'
    ],
    location: 'Alibag, India',
    distance: '94 kilometres',
    dates: '11-16 May',
    price: '₹68,000',
    nights: 5,
    rating: 5.0,
    isFavorite: false
  },
  {
    id: 4,
    images: [
      'https://a0.muscache.com/im/pictures/a1601e0d-2c27-48d2-b538-6ae9f739c4e9.jpg',
      'https://a0.muscache.com/im/pictures/1e9f996f-2dc5-4c6a-9402-76d0383edaff.jpg',
      'https://a0.muscache.com/im/pictures/60545cde-ad54-4181-b0d5-d08507834d12.jpg'
    ],
    location: 'Kashid, India',
    distance: '112 kilometres',
    dates: '6-11 May',
    price: '₹32,199',
    nights: 5,
    rating: 4.78,
    isFavorite: false
  },
  {
    id: 5,
    images: [
      'https://a0.muscache.com/im/pictures/6d9c034c-1635-4da5-b1a6-71a1aaf876db.jpg',
      'https://a0.muscache.com/im/pictures/71015ab5-3573-4438-a690-4d3ef2ab0da6.jpg',
      'https://a0.muscache.com/im/pictures/2b80e224-b2b2-4e28-acd8-b649e2205f7c.jpg'
    ],
    location: 'Anjuna, India',
    distance: '396 kilometres',
    dates: '4-9 June',
    price: '₹66,419',
    nights: 5,
    rating: 4.91,
    isFavorite: false
  },
  {
    id: 6,
    images: [
      'https://a0.muscache.com/im/pictures/55211968/15f51cb5_original.jpg',
      'https://a0.muscache.com/im/pictures/55211964/62a29af8_original.jpg',
      'https://a0.muscache.com/im/pictures/55211967/2d46e6e9_original.jpg'
    ],
    location: 'Panchgani, India',
    distance: '115 kilometres',
    dates: '7-12 May',
    price: '₹51,700',
    nights: 5,
    rating: 4.87,
    isFavorite: true
  },
  {
    id: 7,
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-716674858509458166/original/f8cf8085-5639-40f9-a64e-994ead894308.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-716674858509458166/original/68c1ad00-b1ea-4026-ba0e-ec32a5e10d12.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-716674858509458166/original/9e149d6a-11d6-4a41-9356-5d3410a44e7e.jpeg'
    ],
    location: 'Mumbai, India',
    distance: '21 kilometres',
    dates: '22-27 May',
    price: '₹58,048',
    nights: 5,
    rating: 4.95,
    isFavorite: false
  },
  {
    id: 8,
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-16971764/original/e0305597-1500-4d1b-9e4b-937d5a3b7032.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-16971764/original/801a1ecf-b077-4963-ab02-6f38eab3f223.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-16971764/original/e3bf0430-08d1-44dc-8536-799ca0092d2c.jpeg'
    ],
    location: 'Kamshet, India',
    distance: '77 kilometres',
    dates: '1-6 June',
    price: '₹12,885',
    nights: 5,
    rating: 4.79,
    isFavorite: false
  },
];

const PropertyGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 px-6 md:px-10 lg:px-20 py-8">
      {PropertiesMockData.map((property) => (
        <PropertyCard
          key={property.id}
          images={property.images}
          location={property.location}
          distance={property.distance}
          dates={property.dates}
          price={property.price}
          nights={property.nights}
          rating={property.rating}
          isFavorite={property.isFavorite}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
