
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOY_CATEGORIES } from '@/constants/categories';
import LocationAutocomplete from '@/components/LocationAutocomplete';
import MapPreview from '@/components/MapPreview';

interface ToyDetailsFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  setCondition: React.Dispatch<React.SetStateAction<'new' | 'like-new' | 'good' | 'fair' | 'poor'>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  coordinates: { lat: number; lng: number } | null;
  setCoordinates: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>;
}

const ToyDetailsForm: React.FC<ToyDetailsFormProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  condition,
  setCondition,
  category,
  setCategory,
  location,
  setLocation,
  coordinates,
  setCoordinates
}) => {
  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  const handleCoordinatesChange = (lat: number, lng: number) => {
    setCoordinates({ lat, lng });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Toy Name</Label>
        <Input 
          id="title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. LEGO Star Wars Set"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the toy, including any details about its condition..."
          rows={5}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={category} 
            onValueChange={setCategory}
            required
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {TOY_CATEGORIES.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="condition">Condition</Label>
          <Select 
            value={condition} 
            onValueChange={(value: 'new' | 'like-new' | 'good' | 'fair' | 'poor') => setCondition(value)}
          >
            <SelectTrigger id="condition">
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="like-new">Like New</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Start typing to see suggestions or use your current location
          </p>
          <LocationAutocomplete
            id="location"
            value={location}
            onChange={handleLocationChange}
            onCoordinatesChange={handleCoordinatesChange}
            placeholder="e.g. Brooklyn, NY"
            required
          />
        </div>
        
        {coordinates && (
          <MapPreview 
            latitude={coordinates.lat}
            longitude={coordinates.lng}
            height="250px"
            zoom={14}
          />
        )}
      </div>
    </div>
  );
};

export default ToyDetailsForm;
