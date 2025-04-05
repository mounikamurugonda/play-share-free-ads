
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext';
import { useAds } from '@/context/AdsContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TOY_CATEGORIES } from '@/constants/categories';
import { Camera, Loader2 } from 'lucide-react';
import LocationAutocomplete from '@/components/LocationAutocomplete';

const PostAdPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createAd } = useAds();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState<'new' | 'like-new' | 'good' | 'fair' | 'poor'>('good');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Check if user is logged in
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-16 px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-4xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold mb-4">Please log in</h1>
            <p className="text-gray-500 mb-6">
              You need to be logged in to post a toy listing.
            </p>
            <Button 
              className="bg-toy-blue hover:bg-toy-blue/90"
              onClick={() => navigate('/login')}
            >
              Log in
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (images.length === 0) {
      toast({
        variant: "destructive",
        title: "Images required",
        description: "Please add at least one image of the toy.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const categoryName = TOY_CATEGORIES.find(cat => cat.id === category)?.name || category;
      
      await createAd({
        title,
        description,
        price: 'Free', // All toys are free in this platform
        condition,
        category: categoryName,
        images,
        location,
        userId: user.id
      });
      
      toast({
        title: "Ad posted successfully!",
        description: "Your toy listing is now available for others to see.",
      });
      
      // Changed from '/my-ads' to '/profile' since there's no my-ads route in the App.tsx
      navigate('/profile');
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to post ad",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Share a Toy
        </h1>
        
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Post a Free Toy Listing</CardTitle>
              <CardDescription>
                Fill out this form to share your toy with others in the community.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {/* Progress steps */}
              <div className="flex justify-between mb-8">
                <div 
                  className={`flex-1 text-center ${
                    currentStep === 1 ? 'text-toy-blue' : 'text-gray-400'
                  }`}
                >
                  <div 
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${
                      currentStep === 1 ? 'bg-toy-blue text-white' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    1
                  </div>
                  <div className="text-xs">Details</div>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  <div className={`h-0.5 w-full ${
                    currentStep > 1 ? 'bg-toy-blue' : 'bg-gray-200'
                  }`} />
                </div>
                
                <div 
                  className={`flex-1 text-center ${
                    currentStep === 2 ? 'text-toy-blue' : 'text-gray-400'
                  }`}
                >
                  <div 
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${
                      currentStep === 2 ? 'bg-toy-blue text-white' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    2
                  </div>
                  <div className="text-xs">Photos</div>
                </div>
              </div>
            
              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 1 && (
                  <>
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
                      <LocationAutocomplete
                        id="location"
                        value={location}
                        onChange={setLocation}
                        placeholder="e.g. Brooklyn, NY"
                        required
                      />
                    </div>
                  </>
                )}
                
                {currentStep === 2 && (
                  <>
                    <div className="space-y-3">
                      <Label>Photos</Label>
                      <p className="text-sm text-gray-500">
                        Add up to 5 photos of the toy. The first photo will be used as the main image.
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
                        {images.length < 5 && (
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
                  </>
                )}
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </Button>
              ) : (
                <div></div> /* Empty div for spacing */
              )}
              
              {currentStep < 2 ? (
                <Button
                  type="button"
                  className="bg-toy-blue hover:bg-toy-blue/90"
                  onClick={() => {
                    if (!title || !description || !category || !condition || !location) {
                      toast({
                        variant: "destructive",
                        title: "Missing fields",
                        description: "Please fill in all required fields before continuing.",
                      });
                      return;
                    }
                    setCurrentStep(currentStep + 1);
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="bg-toy-blue hover:bg-toy-blue/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    "Post Toy Ad"
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default PostAdPage;
