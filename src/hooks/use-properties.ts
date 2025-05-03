
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

export const useProperties = (location?: string, filters?: { remoteWorkOnly?: boolean }) => {
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
        const transformedData = data?.map(item => ({
          id: item.id,
          name: item.name,
          location: item.location,
          imageUrl: item.imageurl,
          pricePerNight: item.pricepernight,
          rating: item.rating,
          distance: item.distance,
          availableFrom: item.availablefrom,
          availableTo: item.availableto,
          remoteWorkFriendly: item.remoteworkfriendly || false // Default to false if not present
        })) || [];
        
        // Apply remote work filter if specified
        const filteredData = filters?.remoteWorkOnly
          ? transformedData.filter(property => property.remoteWorkFriendly)
          : transformedData;
        
        setProperties(filteredData);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [location, filters?.remoteWorkOnly]);

  return { properties, loading, error };
};
