
import React, { useRef, useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from 'lucide-react';
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions';
import LocationSuggestions from './LocationSuggestions';

interface LocationAutocompleteProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  onCoordinatesChange?: (lat: number, lng: number) => void;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  id,
  value,
  onChange,
  placeholder = "Enter a location",
  required = false,
  onCoordinatesChange,
}) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const { suggestions, isOpen, setIsOpen } = useLocationSuggestions({
    value,
    maxSuggestions: 5
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setIsOpen(false);
    
    // Geocode the selected location to get coordinates
    // In a real app, this would use a geocoding API
    // For this demo, we'll use random coordinates near the US
    const randomLat = 37 + (Math.random() * 10 - 5);
    const randomLng = -98 + (Math.random() * 20 - 10);
    
    if (onCoordinatesChange) {
      onCoordinatesChange(randomLat, randomLng);
    }
  };

  const handleUseMyLocation = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // In a real app, you would use reverse geocoding to get the address
          // For this demo, we'll just set a placeholder address
          onChange("Current location (detected)");
          
          if (onCoordinatesChange) {
            onCoordinatesChange(latitude, longitude);
          }
          
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      setIsLoadingLocation(false);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            autoComplete="off"
            onFocus={() => value.length > 1 && suggestions.length > 0 && setIsOpen(true)}
            className="pr-8"
          />
          {value.length > 0 && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear input"
            >
              ×
            </button>
          )}
        </div>
        <Button 
          type="button" 
          variant="outline" 
          className="flex-shrink-0"
          onClick={handleUseMyLocation}
          disabled={isLoadingLocation}
        >
          {isLoadingLocation ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span>Locating...</span>
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4 mr-2" />
              <span>Use my location</span>
            </>
          )}
        </Button>
      </div>
      
      <LocationSuggestions
        suggestions={suggestions}
        isOpen={isOpen}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default LocationAutocomplete;
