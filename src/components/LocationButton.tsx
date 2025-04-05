
import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from 'lucide-react';

interface LocationButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const LocationButton: React.FC<LocationButtonProps> = ({
  onClick,
  isLoading
}) => {
  return (
    <Button 
      type="button" 
      variant="outline" 
      className="flex-shrink-0"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
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
  );
};

export default LocationButton;
