
import React from 'react';

interface LocationSuggestionsProps {
  suggestions: string[];
  isOpen: boolean;
  onSelect: (suggestion: string) => void;
}

const LocationSuggestions: React.FC<LocationSuggestionsProps> = ({
  suggestions,
  isOpen,
  onSelect,
}) => {
  if (!isOpen || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
      <ul className="py-1">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center gap-2"
            onClick={() => onSelect(suggestion)}
          >
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSuggestions;
