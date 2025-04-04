
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToyCard from '@/components/ToyCard';
import { useAds } from '@/context/AdsContext';
import { TOY_CATEGORIES } from '@/constants/categories';
import { ToyAd } from '@/types';

const BrowsePage = () => {
  const location = useLocation();
  const { ads } = useAds();
  const { toast } = useToast();
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [location_, setLocation] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Results
  const [filteredResults, setFilteredResults] = useState<ToyAd[]>(ads);
  
  // Get query params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const categoryParam = params.get('category');
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [location.search]);
  
  // Apply filters when they change
  useEffect(() => {
    let results = [...ads];
    
    // Apply search query filter
    if (searchQuery) {
      results = results.filter(ad => 
        ad.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        ad.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (category) {
      const categoryName = TOY_CATEGORIES.find(cat => cat.id === category)?.name;
      if (categoryName) {
        results = results.filter(ad => ad.category === categoryName);
      }
    }
    
    // Apply condition filter
    if (condition) {
      results = results.filter(ad => ad.condition === condition);
    }
    
    // Apply location filter
    if (location_) {
      results = results.filter(ad => 
        ad.location.toLowerCase().includes(location_.toLowerCase())
      );
    }
    
    setFilteredResults(results);
  }, [ads, searchQuery, category, condition, location_]);
  
  const clearFilters = () => {
    setSearchQuery('');
    setCategory('');
    setCondition('');
    setLocation('');
    toast({
      title: "Filters cleared",
      description: "Showing all available toys.",
    });
  };
  
  return (
    <>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar for desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-lg border p-5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters} 
                  className="h-8 text-sm"
                >
                  Clear all
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Search filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Input
                      placeholder="Search toys..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
                
                {/* Category filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All categories</SelectItem>
                      {TOY_CATEGORIES.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Condition filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Condition</label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any condition</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Location filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    placeholder="Enter city or area..."
                    value={location_}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile filter button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              className="w-full mb-4 flex justify-between"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span className="flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </span>
              {(searchQuery || category || condition || location_) && (
                <Badge variant="secondary">Active filters</Badge>
              )}
            </Button>
            
            {showFilters && (
              <div className="bg-white rounded-lg border p-5 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters} 
                    className="h-8 text-sm"
                  >
                    Clear all
                  </Button>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="search">
                    <AccordionTrigger>Search</AccordionTrigger>
                    <AccordionContent>
                      <div className="relative">
                        <Input
                          placeholder="Search toys..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="All categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All categories</SelectItem>
                          {TOY_CATEGORIES.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.icon} {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="condition">
                    <AccordionTrigger>Condition</AccordionTrigger>
                    <AccordionContent>
                      <Select value={condition} onValueChange={setCondition}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any condition</SelectItem>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="like-new">Like New</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="location">
                    <AccordionTrigger>Location</AccordionTrigger>
                    <AccordionContent>
                      <Input
                        placeholder="Enter city or area..."
                        value={location_}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <Button 
                  className="w-full mt-4 bg-toy-blue hover:bg-toy-blue/90"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            )}
          </div>
        
          {/* Results area */}
          <div className="flex-1">
            {/* Active filters display */}
            {(searchQuery || category || condition || location_) && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                
                {searchQuery && (
                  <Badge 
                    variant="outline" 
                    className="flex items-center gap-1 pl-2 pr-1 py-1"
                  >
                    Search: {searchQuery}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {category && (
                  <Badge 
                    variant="outline" 
                    className="flex items-center gap-1 pl-2 pr-1 py-1"
                  >
                    Category: {TOY_CATEGORIES.find(cat => cat.id === category)?.name || category}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                      onClick={() => setCategory('')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {condition && (
                  <Badge 
                    variant="outline" 
                    className="flex items-center gap-1 pl-2 pr-1 py-1"
                  >
                    Condition: {condition}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                      onClick={() => setCondition('')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {location_ && (
                  <Badge 
                    variant="outline" 
                    className="flex items-center gap-1 pl-2 pr-1 py-1"
                  >
                    Location: {location_}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                      onClick={() => setLocation('')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters} 
                  className="text-sm text-toy-blue hover:text-toy-blue/80"
                >
                  Clear all
                </Button>
              </div>
            )}
            
            {/* Results count and sort */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {filteredResults.length} {filteredResults.length === 1 ? 'Toy' : 'Toys'} Available
              </h2>
            </div>
            
            {/* Results grid */}
            {filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map(ad => (
                  <ToyCard key={ad.id} ad={ad} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-4">🧸</div>
                <h3 className="text-xl font-bold mb-2">No toys found</h3>
                <p className="text-gray-500 mb-6">
                  We couldn't find any toys matching your filters. Try adjusting your search.
                </p>
                <Button onClick={clearFilters} className="bg-toy-blue hover:bg-toy-blue/90">
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default BrowsePage;
