
import { useState, useEffect } from 'react';
import { LOCATIONS } from '@/utils/locationData';

interface UseLocationSuggestionsProps {
  value: string;
  maxSuggestions?: number;
}

export const useLocationSuggestions = ({ 
  value, 
  maxSuggestions = 5 
}: UseLocationSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Filter suggestions based on user input
  useEffect(() => {
    if (value.length > 1) {
      const filtered = LOCATIONS.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      ).slice(0, maxSuggestions);
      
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [value, maxSuggestions]);

  return {
    suggestions,
    isOpen,
    setIsOpen,
  };
};
