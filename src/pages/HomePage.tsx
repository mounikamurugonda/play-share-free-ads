
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import ToyCard from '@/components/ToyCard';
import CategoryIcon from '@/components/CategoryIcon';
import { useAds } from '@/context/AdsContext';
import { TOY_CATEGORIES } from '@/constants/categories';
import { ToyAd } from '@/types';

const HomePage = () => {
  const { featuredAds, ads } = useAds();
  const navigate = useNavigate();
  
  // Take the 6 most recent ads
  const recentAds = [...ads].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 6);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-14 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Share Toys, <span className="text-toy-blue">Spread Joy</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            A 100% free community for parents to give away toys their children 
            have outgrown to families who can use them.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
            <Button 
              className="bg-toy-blue hover:bg-toy-blue/90 text-lg h-12 px-8 rounded-full"
              onClick={() => navigate('/browse')}
            >
              Find Toys
            </Button>
            <Button 
              variant="outline" 
              className="text-lg h-12 px-8 border-toy-blue text-toy-blue hover:bg-toy-blue/10 rounded-full"
              onClick={() => navigate('/post-ad')}
            >
              Share a Toy
            </Button>
          </div>
          
          <div className="max-w-xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {TOY_CATEGORIES.slice(0, 10).map((category) => (
              <CategoryIcon
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured & Recent Toys Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="featured" className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <TabsList className="bg-white">
                <TabsTrigger value="featured">Featured Toys</TabsTrigger>
                <TabsTrigger value="recent">Recently Added</TabsTrigger>
              </TabsList>
              <Link to="/browse" className="text-toy-blue hover:underline text-sm">
                View All Toys →
              </Link>
            </div>
            
            <TabsContent value="featured">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {featuredAds.map((ad) => (
                  <ToyCard key={ad.id} ad={ad} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recentAds.map((ad) => (
                  <ToyCard key={ad.id} ad={ad} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 text-center">
            How ToyShare Works
          </h2>
          <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Our platform is 100% free - no fees, no premium listings, just a community sharing toys.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="bg-toy-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-3xl">📸</span>
              </div>
              <h3 className="font-bold text-xl">Post Your Toys</h3>
              <p className="text-gray-600">
                Take photos and create a simple listing for toys your children have outgrown.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-toy-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="font-bold text-xl">Connect</h3>
              <p className="text-gray-600">
                Message other families interested in your toys and arrange pickup.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-toy-orange/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-3xl">🎁</span>
              </div>
              <h3 className="font-bold text-xl">Share Joy</h3>
              <p className="text-gray-600">
                Give your toys a second life and help make other children happy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-toy-blue to-toy-green py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to share toys with families in your community?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our free community today and start sharing!
          </p>
          <Button 
            className="bg-white text-toy-blue hover:bg-white/90 text-lg h-12 px-8 rounded-full"
            onClick={() => navigate('/signup')}
          >
            Sign Up Now - It's Free!
          </Button>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default HomePage;
