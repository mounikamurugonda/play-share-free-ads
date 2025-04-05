
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext';
import { useAds } from '@/context/AdsContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';
import LoginPrompt from '@/components/LoginPrompt';
import ImageUploader from '@/components/ImageUploader';
import ToyDetailsForm from '@/components/ToyDetailsForm';
import FormProgressSteps from '@/components/FormProgressSteps';
import { TOY_CATEGORIES } from '@/constants/categories';

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
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Check if user is logged in
  if (!user) {
    return <LoginPrompt />;
  }
  
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
        coordinates: coordinates || undefined,
        userId: user.id
      });
      
      toast({
        title: "Ad posted successfully!",
        description: "Your toy listing is now available for others to see.",
      });
      
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
              <FormProgressSteps currentStep={currentStep} totalSteps={2} />
            
              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 1 && (
                  <ToyDetailsForm 
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    condition={condition}
                    setCondition={setCondition}
                    category={category}
                    setCategory={setCategory}
                    location={location}
                    setLocation={setLocation}
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                  />
                )}
                
                {currentStep === 2 && (
                  <ImageUploader 
                    images={images}
                    setImages={setImages}
                  />
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
