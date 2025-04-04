
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useAds } from '@/context/AdsContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToyCard from '@/components/ToyCard';

const ProfilePage = () => {
  const { user } = useAuth();
  const { getUserAds } = useAds();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-16 px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-4xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold mb-4">Please log in</h1>
            <p className="text-gray-500 mb-6">
              You need to be logged in to view your profile.
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
  
  const userAds = getUserAds(user.id);
  
  return (
    <>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-24 h-24 border-4 border-white shadow-md">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
              
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-500 mb-4">
                {user.location && (
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{user.location}</span>
                  </div>
                )}
                
                {user.rating && (
                  <div className="flex items-center justify-center md:justify-start">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" />
                    <span>{user.rating} / 5</span>
                  </div>
                )}
                
                <div className="flex items-center justify-center md:justify-start">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    Member since {new Date().getFullYear()}
                  </span>
                </div>
              </div>
              
              {user.bio && (
                <p className="text-gray-600 mb-4">{user.bio}</p>
              )}
              
              <div>
                <Button 
                  variant="outline" 
                  className="border-toy-blue text-toy-blue hover:bg-toy-blue/10"
                  onClick={() => navigate('/profile/edit')}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile content */}
        <Tabs defaultValue="my-ads" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="my-ads">My Ads</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-ads">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  Your Toy Listings ({userAds.length})
                </h2>
                <Button 
                  className="bg-toy-blue hover:bg-toy-blue/90"
                  onClick={() => navigate('/post-ad')}
                >
                  Post a New Toy
                </Button>
              </div>
              
              {userAds.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userAds.map(ad => (
                    <ToyCard key={ad.id} ad={ad} hideUser />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="text-4xl mb-4">🎁</div>
                    <h3 className="text-lg font-semibold mb-2">No toys listed yet</h3>
                    <p className="text-gray-500 mb-4">
                      You haven't shared any toys with the community yet.
                    </p>
                    <Button 
                      className="bg-toy-blue hover:bg-toy-blue/90"
                      onClick={() => navigate('/post-ad')}
                    >
                      Share Your First Toy
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                <p className="text-gray-500">
                  When you receive messages about your toy listings, they'll appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="favorites">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                <p className="text-gray-500 mb-4">
                  When you save toys you're interested in, they'll appear here.
                </p>
                <Button 
                  className="bg-toy-blue hover:bg-toy-blue/90"
                  onClick={() => navigate('/browse')}
                >
                  Browse Toys
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <p className="text-gray-500 mb-6">
                  Account settings and preferences coming soon in a future update.
                </p>
                
                <div className="border-t pt-4 mt-4">
                  <Button 
                    variant="outline" 
                    className="border-red-500 text-red-500 hover:bg-red-50"
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </>
  );
};

export default ProfilePage;
