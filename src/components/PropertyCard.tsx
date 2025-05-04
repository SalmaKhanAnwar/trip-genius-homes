
import React from 'react';
import { Heart, Star, Wifi, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface PropertyCardProps {
  images: string[];
  location: string;
  distance: string;
  dates: string;
  price: string;
  currency?: string;
  nights: number;
  rating?: number;
  isFavorite?: boolean;
  hasVirtualTour?: boolean;
  isRemoteWorkFriendly?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  images,
  location,
  distance,
  dates,
  price,
  currency = '₹',
  nights,
  rating,
  isFavorite = false,
  hasVirtualTour = false,
  isRemoteWorkFriendly = false
}) => {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [liked, setLiked] = React.useState(isFavorite);
  const [isVirtualTourActive, setIsVirtualTourActive] = React.useState(false);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const toggleVirtualTour = () => {
    if (hasVirtualTour) {
      setIsVirtualTourActive(!isVirtualTourActive);
    }
  };

  return (
    <div 
      className="flex flex-col space-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square rounded-xl overflow-hidden">
        {/* Virtual Tour View */}
        {isVirtualTourActive ? (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
            <iframe 
              src={`https://www.google.com/maps/embed?pb=!4v1696847685193!6m8!1m7!1sCAoSLEFGMVFpcE1WeFQ1UlM1NWJvVVdZV2NoV3Q0a0RfbmpHVjhFTWtLVmZuUFky!2m2!1d28.6139391!2d77.2090212!3f0!4f0!5f0.7820865974627469`} 
              width="100%" 
              height="100%" 
              className="absolute inset-0"
              frameBorder="0" 
              allowFullScreen 
            />
            <Button 
              onClick={toggleVirtualTour}
              className="absolute top-2 right-2 bg-white text-black hover:bg-gray-200 z-30"
              size="sm"
            >
              Exit 360° View
            </Button>
          </div>
        ) : (
          <>
            {/* Standard Image View */}
            <img 
              src={images[activeImageIndex]} 
              alt={`Property in ${location}`} 
              className="object-cover w-full h-full"
            />

            {/* Property Tags */}
            <div className="absolute top-3 left-3 flex space-x-2 z-10">
              {isRemoteWorkFriendly && (
                <span className="bg-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Wifi className="h-3 w-3 mr-1 text-airbnb-pink" />
                  Remote Work
                </span>
              )}
              {hasVirtualTour && (
                <span 
                  className="bg-white px-2 py-1 rounded-full text-xs font-medium flex items-center cursor-pointer hover:bg-gray-100"
                  onClick={toggleVirtualTour}
                >
                  <Compass className="h-3 w-3 mr-1 text-airbnb-pink" />
                  360° Tour
                </span>
              )}
            </div>

            {/* Favorite button */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setLiked(!liked);
              }}
              className="absolute top-3 right-3 z-10"
            >
              <Heart 
                className={`h-6 w-6 drop-shadow-lg transition-colors ${liked ? 'text-airbnb-pink fill-airbnb-pink' : 'text-white'}`} 
              />
            </button>

            {/* Navigation arrows - Only show when hovered */}
            {images.length > 1 && isHovered && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 shadow-md opacity-90 hover:opacity-100"
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current">
                    <path d="M9.41 14.58L4.83 10l4.58-4.59L10.99 7 8 10l2.99 3-1.58 1.58z" />
                  </svg>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 shadow-md opacity-90 hover:opacity-100"
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current">
                    <path d="M6.58 14.58L11.17 10l-4.59-4.59L5 7l3 3-3 3 1.58 1.58z" />
                  </svg>
                </button>
              </>
            )}

            {/* Image indicator dots */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Property info */}
      <div className="flex justify-between items-start">
        <div className="font-medium text-airbnb-darkGray">{location}</div>
        {rating && (
          <div className="flex items-center">
            <Star className="h-3 w-3 mr-1 text-airbnb-darkGray fill-airbnb-darkGray" />
            <span className="font-medium text-airbnb-darkGray">{rating}</span>
          </div>
        )}
      </div>
      <div className="text-airbnb-lightGray">{distance} away</div>
      <div className="text-airbnb-lightGray">{dates}</div>
      <div>
        <span className="font-medium">{currency}{price}</span> for {nights} nights
      </div>
    </div>
  );
};

export default PropertyCard;
