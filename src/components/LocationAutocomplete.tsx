
import React, { useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions';
import { useGeolocation } from '@/hooks/useGeolocation';
import LocationSuggestions from './LocationSuggestions';
import LocationButton from './LocationButton';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { getCurrentLocation, isLoading, error } = useGeolocation();
  
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

  // Show error toast when geolocation fails
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Location Error",
        description: error,
      });
    }
  }, [error, toast]);

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

  const handleUseMyLocation = async () => {
    try {
      const { latitude, longitude, formatted } = await getCurrentLocation();
      onChange(formatted);
      
      if (onCoordinatesChange) {
        onCoordinatesChange(latitude, longitude);
      }
    } catch (err) {
      // Error is handled by the hook and displayed via toast
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
        <LocationButton 
          onClick={handleUseMyLocation}
          isLoading={isLoading}
        />
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
