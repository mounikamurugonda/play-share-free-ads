
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Flag, MapPin, MessageSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAds } from '@/context/AdsContext';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getAdById } = useAds();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const ad = getAdById(id || '');
  
  if (!ad) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-16 px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-4xl mb-4">🧸</div>
            <h1 className="text-2xl font-bold mb-4">Toy not found</h1>
            <p className="text-gray-500 mb-6">
              The toy listing you're looking for might be removed or doesn't exist.
            </p>
            <Button asChild className="bg-toy-blue hover:bg-toy-blue/90">
              <Link to="/browse">Browse Other Toys</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  const { 
    title, description, price, condition, category, 
    images, location, userId, createdAt 
  } = ad;
  
  const conditionColor = {
    'new': 'bg-green-100 text-green-800',
    'like-new': 'bg-blue-100 text-blue-800',
    'good': 'bg-yellow-100 text-yellow-800',
    'fair': 'bg-orange-100 text-orange-800',
    'poor': 'bg-red-100 text-red-800'
  }[condition];
  
  const isUserAd = user && userId === user.id;
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const handleContactSeller = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        variant: "destructive",
        title: "Message required",
        description: "Please enter a message to the toy owner.",
      });
      return;
    }
    
    // In a real app, this would send the message to the backend
    toast({
      title: "Message sent!",
      description: "The toy owner will get back to you soon.",
    });
    
    setMessage('');
    setDialogOpen(false);
  };
  
  const handleReportAd = () => {
    toast({
      title: "Ad reported",
      description: "Thank you for reporting this ad. Our moderators will review it.",
    });
  };
  
  return (
    <>
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        {/* Breadcrumb navigation */}
        <nav className="flex mb-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-toy-blue">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/browse" className="hover:text-toy-blue">Browse</Link>
          <span className="mx-2">›</span>
          <Link to={`/browse?category=${category}`} className="hover:text-toy-blue">
            {category}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">{title}</span>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <div className="relative pt-[75%]">
                <img 
                  src={images[activeImageIndex]} 
                  alt={title}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((image, index) => (
                  <button 
                    key={index} 
                    className={`rounded-md overflow-hidden border-2 ${
                      index === activeImageIndex 
                        ? 'border-toy-blue' 
                        : 'border-transparent'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <div className="pt-[75%] relative">
                      <img 
                        src={image} 
                        alt={`${title} - Image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Ad details */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleReportAd}
                  className="text-gray-500"
                >
                  <Flag className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center mb-4">
                <Badge 
                  variant="outline" 
                  className={`${conditionColor} border-none mr-2`}
                >
                  {condition.replace('-', ' ')}
                </Badge>
                
                <Badge variant="secondary">{category}</Badge>
                
                {price === 'Free' && (
                  <Badge className="ml-2 bg-toy-orange text-white">
                    Free
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center text-gray-500 text-sm mb-6">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{location}</span>
                <span className="mx-2">•</span>
                <span>Posted on {formattedDate}</span>
              </div>
            </div>
            
            <Card className="p-5">
              <Tabs defaultValue="description">
                <TabsList className="mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="space-y-4">
                  <p className="text-gray-700">{description}</p>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-500">Category</div>
                    <div className="font-medium">{category}</div>
                    
                    <div className="text-gray-500">Condition</div>
                    <div className="font-medium">
                      {condition.replace('-', ' ')}
                    </div>
                    
                    <div className="text-gray-500">Price</div>
                    <div className="font-medium">{price}</div>
                    
                    <div className="text-gray-500">Location</div>
                    <div className="font-medium">{location}</div>
                  </div>
                </TabsContent>
              </Tabs>
              
              {!isUserAd ? (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full mt-6 bg-toy-blue hover:bg-toy-blue/90"
                    >
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Contact Toy Owner
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Message about "{title}"</DialogTitle>
                      <DialogDescription>
                        Send a message to the owner about this toy. You'll be notified when they reply.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleContactSeller} className="space-y-4">
                      <Textarea
                        placeholder="Hello, I'm interested in this toy..."
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="bg-toy-blue hover:bg-toy-blue/90">
                          Send Message
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="flex space-x-3 mt-6">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-toy-blue text-toy-blue"
                    onClick={() => {
                      toast({
                        title: "Edit feature coming soon",
                        description: "This feature will be available in the future updates.",
                      });
                    }}
                  >
                    Edit Ad
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => {
                      toast({
                        title: "Delete feature coming soon",
                        description: "This feature will be available in the future updates.",
                      });
                    }}
                  >
                    Delete Ad
                  </Button>
                </div>
              )}
            </Card>
            
            {/* Owner info */}
            <Card className="p-5">
              <h3 className="font-semibold mb-4">About the donor</h3>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-gray-500 text-sm">Toy donor</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Similar toys section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Toys</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Here would be similar toy listings */}
            <div className="text-center p-8 bg-gray-50 rounded-lg col-span-full">
              <p className="text-gray-500">
                More similar toys coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AdDetailPage;
