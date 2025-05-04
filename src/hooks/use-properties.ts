
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Property {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  pricePerNight: number;
  rating: number | null;
  distance: string | null;
  availableFrom: string | null;
  availableTo: string | null;
  remoteWorkFriendly: boolean;
}

export const useProperties = (location?: string, filters?: { 
  remoteWorkOnly?: boolean,
  showVirtualTours?: boolean,
  showSuperhost?: boolean,
  flexibleDates?: boolean
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      
      try {
        let query = supabase.from('properties').select('*');
        
        if (location) {
          // Extract the city name before the comma
          const city = location.split(',')[0].trim();
          query = query.ilike('location', `${city}%`);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        // Transform the data to match the Property interface
        const transformedData = data?.map(item => {
          // Create a property object with known fields
          const property: Property = {
            id: item.id,
            name: item.name,
            location: item.location,
            imageUrl: item.imageurl,
            pricePerNight: item.pricepernight,
            rating: item.rating,
            distance: item.distance,
            availableFrom: item.availablefrom,
            availableTo: item.availableto,
            remoteWorkFriendly: false // Default value
          };
          
          // Check if remoteworkfriendly exists and is true in the raw data
          if ('remoteworkfriendly' in item && item.remoteworkfriendly === true) {
            property.remoteWorkFriendly = true;
          }
          
          return property;
        }) || [];
        
        // Apply filters
        let filteredData = transformedData;
        
        if (filters?.remoteWorkOnly) {
          filteredData = filteredData.filter(property => property.remoteWorkFriendly);
        }
        
        // Additional filters could be implemented here
        // For example, if we add a showSuperhost field to the database:
        // if (filters?.showSuperhost) {
        //   filteredData = filteredData.filter(property => property.isSuperhost);
        // }
        
        setProperties(filteredData);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [location, filters?.remoteWorkOnly, filters?.showVirtualTours, filters?.showSuperhost, filters?.flexibleDates]);

  return { properties, loading, error };
};
