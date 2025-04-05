
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";

// Sample list of US addresses - in a real app, this would come from an API
const US_ADDRESSES = [
  "123 Main St, New York, NY 10001",
  "456 Broadway, New York, NY 10002",
  "789 5th Avenue, New York, NY 10003",
  "101 Hollywood Blvd, Los Angeles, CA 90001",
  "202 Sunset Blvd, Los Angeles, CA 90002",
  "303 Rodeo Dr, Beverly Hills, CA 90210",
  "404 Michigan Ave, Chicago, IL 60601",
  "505 State St, Chicago, IL 60602",
  "606 Lake Shore Dr, Chicago, IL 60603",
  "707 Market St, San Francisco, CA 94103",
  "808 Union Square, San Francisco, CA 94108",
  "909 Fisherman's Wharf, San Francisco, CA 94133",
  "1010 Lombard St, San Francisco, CA 94109",
  "1111 Mission St, San Francisco, CA 94103",
  "1212 Powell St, San Francisco, CA 94108",
  "1313 Haight St, San Francisco, CA 94117",
  "1414 Castro St, San Francisco, CA 94114",
  "1515 Valencia St, San Francisco, CA 94110",
  "1616 Divisadero St, San Francisco, CA 94115",
  "1717 Ocean Ave, San Francisco, CA 94112",
  // Additional entries with street addresses
  "123 Peachtree St, Atlanta, GA 30303",
  "456 Piedmont Ave, Atlanta, GA 30308",
  "789 Ponce de Leon Ave, Atlanta, GA 30306",
  "101 First St, Austin, TX 78701",
  "202 Congress Ave, Austin, TX 78701",
  "303 Sixth St, Austin, TX 78701",
  "404 Rainey St, Austin, TX 78701",
  "505 Lavaca St, Austin, TX 78701"
];

// Also include the simpler city/state entries
const US_CITIES = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
  "Austin, TX",
  "Jacksonville, FL",
  "Fort Worth, TX",
  "Columbus, OH",
  "San Francisco, CA",
  "Charlotte, NC",
  "Indianapolis, IN",
  "Seattle, WA",
  "Denver, CO",
  "Washington, DC",
  "Boston, MA",
  "El Paso, TX",
  "Nashville, TN",
  "Detroit, MI",
  "Portland, OR",
  "Memphis, TN",
  "Oklahoma City, OK",
  "Las Vegas, NV",
  "Louisville, KY",
  "Baltimore, MD",
  "Milwaukee, WI",
  "Albuquerque, NM",
  "Tucson, AZ",
  "Fresno, CA",
  "Sacramento, CA",
  "Mesa, AZ",
  "Kansas City, MO",
  "Atlanta, GA",
  "Long Beach, CA",
  "Colorado Springs, CO",
  "Raleigh, NC",
  "Miami, FL",
  "Oakland, CA",
  "Minneapolis, MN",
  "Tulsa, OK",
  "Cleveland, OH",
  "Wichita, KS",
  "Arlington, TX",
  "New Orleans, LA",
  "Brooklyn, NY",
  "Queens, NY",
  "Manhattan, NY",
  "Bronx, NY",
  "Staten Island, NY"
];

// Combine both for a comprehensive list
const LOCATIONS = [...US_ADDRESSES, ...US_CITIES];

interface LocationAutocompleteProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  id,
  value,
  onChange,
  placeholder = "Enter a location",
  required = false,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on user input
  useEffect(() => {
    if (value.length > 1) {
      const filtered = LOCATIONS.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [value]);

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
  }, []);

  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        onFocus={() => value.length > 1 && suggestions.length > 0 && setIsOpen(true)}
      />
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
