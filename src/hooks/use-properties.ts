
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
}

export const useProperties = (location?: string) => {
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
          availableTo: item.availableto
        })) || [];
        
        setProperties(transformedData);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [location]);

  return { properties, loading, error };
};
