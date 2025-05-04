
import React from 'react';
import { Heart, Star, Wifi, Compass, Camera, Map, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

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
  arExperienceAvailable?: boolean;
  hostVerified?: boolean;
  guestCapacity?: number;
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
  isRemoteWorkFriendly = false,
  arExperienceAvailable = false,
  hostVerified = false,
  guestCapacity = 2
}) => {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [liked, setLiked] = React.useState(isFavorite);
  const [isVirtualTourActive, setIsVirtualTourActive] = React.useState(false);
  const [isARModeActive, setIsARModeActive] = React.useState(false);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const toggleVirtualTour = () => {
    if (hasVirtualTour) {
      setIsVirtualTourActive(!isVirtualTourActive);
      setIsARModeActive(false);
    }
  };

  const toggleARMode = () => {
    if (arExperienceAvailable) {
      setIsARModeActive(!isARModeActive);
      setIsVirtualTourActive(false);
    }
  };

  // Handle carousel index change - fixed to use with Carousel's onSelect prop
  const handleCarouselChange = React.useCallback((api: any) => {
    const currentIndex = api?.selectedScrollSnap();
    if (currentIndex !== undefined) {
      setActiveImageIndex(currentIndex);
    }
  }, []);

  return (
    <div 
      className="flex flex-col space-y-2 group"
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
        ) : isARModeActive ? (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
            <div className="relative w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5" 
                alt="AR Experience" 
                className="object-cover w-full h-full opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center flex-col text-white">
                <h3 className="text-xl font-bold mb-2">AR Experience</h3>
                <p className="text-sm text-center px-4">
                  Use your phone camera to explore this property in augmented reality
                </p>
              </div>
            </div>
            <Button 
              onClick={toggleARMode}
              className="absolute top-2 right-2 bg-white text-black hover:bg-gray-200 z-30"
              size="sm"
            >
              Exit AR Mode
            </Button>
          </div>
        ) : (
          <>
            {/* Image Carousel */}
            <Carousel 
              className="w-full h-full" 
              setApi={(api) => {
                api?.on('select', () => handleCarouselChange(api));
              }}
            >
              <CarouselContent className="h-full">
                {images.map((image, index) => (
                  <CarouselItem key={index} className="h-full">
                    <AspectRatio ratio={1} className="h-full">
                      <img 
                        src={image} 
                        alt={`Property in ${location} - image ${index + 1}`} 
                        className="object-cover w-full h-full rounded-xl"
                      />
                    </AspectRatio>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {isHovered && images.length > 1 && (
                <>
                  <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8" />
                  <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8" />
                </>
              )}
            </Carousel>

            {/* Property Tags */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10 max-w-[70%]">
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
              
              {arExperienceAvailable && (
                <span 
                  className="bg-white px-2 py-1 rounded-full text-xs font-medium flex items-center cursor-pointer hover:bg-gray-100"
                  onClick={toggleARMode}
                >
                  <Camera className="h-3 w-3 mr-1 text-airbnb-pink" />
                  AR View
                </span>
              )}
              
              {hostVerified && (
                <span className="bg-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  Verified Host
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
            
            {/* Guest capacity */}
            <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Users className="h-3 w-3 mr-1 text-airbnb-darkGray" />
              {guestCapacity}
            </div>
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
      <div className="flex justify-between items-center">
        <span className="text-airbnb-lightGray">{distance} away</span>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
          <Map className="h-3 w-3 inline mr-1" />
          View on map
        </span>
      </div>
      <div className="text-airbnb-lightGray">{dates}</div>
      <div>
        <span className="font-medium">{currency}{price}</span> for {nights} nights
      </div>
    </div>
  );
};

export default PropertyCard;
