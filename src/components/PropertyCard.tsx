
import React from 'react';
import { Heart } from 'lucide-react';

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
  isFavorite = false
}) => {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [liked, setLiked] = React.useState(isFavorite);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div 
      className="flex flex-col space-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square rounded-xl overflow-hidden">
        {/* Image */}
        <img 
          src={images[activeImageIndex]} 
          alt={`Property in ${location}`} 
          className="object-cover w-full h-full"
        />

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
      </div>
      
      {/* Property info */}
      <div className="flex justify-between items-start">
        <div className="font-medium text-airbnb-darkGray">{location}</div>
        {rating && (
          <div className="flex items-center">
            <svg viewBox="0 0 32 32" className="h-3 w-3 mr-1 fill-airbnb-darkGray">
              <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd"></path>
            </svg>
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
