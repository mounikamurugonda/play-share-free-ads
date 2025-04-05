
import React from 'react';
import { Button } from "@/components/ui/button";
import { Camera } from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  maxImages?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  images, 
  setImages, 
  maxImages = 5 
}) => {
  // Mock image upload (in a real app, this would upload to a server)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // In a real app, we would upload the images and get URLs back
    // For demo purposes, we'll use placeholder images
    const newImages = Array.from({ length: files.length }, (_, i) => 
      `https://images.unsplash.com/photo-${1518946222227 + i}-364f22132616?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3`
    );
    
    setImages([...images, ...newImages]);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        Add up to {maxImages} photos of the toy. The first photo will be used as the main image.
      </p>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Image preview */}
        {images.map((image, index) => (
          <div 
            key={index}
            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
          >
            <img 
              src={image} 
              alt={`Toy image ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 rounded-full"
              onClick={() => {
                const newImages = [...images];
                newImages.splice(index, 1);
                setImages(newImages);
              }}
            >
              ✕
            </Button>
          </div>
        ))}
        
        {/* Upload button */}
        {images.length < maxImages && (
          <div className="relative aspect-square bg-gray-100 rounded-lg flex items-center justify-center flex-col">
            <input 
              type="file" 
              id="image-upload" 
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            <Camera className="h-6 w-6 text-gray-400" />
            <span className="text-sm text-gray-500 mt-2">
              Add photo
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
