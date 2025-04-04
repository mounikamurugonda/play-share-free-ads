
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ToyAd } from '../types';

interface AdsContextType {
  ads: ToyAd[];
  featuredAds: ToyAd[];
  loading: boolean;
  getUserAds: (userId: string) => ToyAd[];
  createAd: (ad: Omit<ToyAd, 'id' | 'createdAt' | 'updatedAt'>) => Promise<ToyAd>;
  getAdById: (id: string) => ToyAd | undefined;
  updateAd: (id: string, ad: Partial<ToyAd>) => Promise<ToyAd>;
  deleteAd: (id: string) => Promise<void>;
}

const AdsContext = createContext<AdsContextType | undefined>(undefined);

// Mock toy ad data
const MOCK_ADS: ToyAd[] = [
  {
    id: '1',
    title: 'LEGO Star Wars Imperial Star Destroyer',
    description: 'Complete set with all pieces and instructions. Barely played with.',
    price: 'Free',
    condition: 'like-new',
    category: 'Building Blocks',
    images: [
      'https://images.unsplash.com/photo-1518946222227-364f22132616?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1609020697742-71fd6c1f8a4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ],
    location: 'Brooklyn, NY',
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-10-15'),
    userId: '1'
  },
  {
    id: '2',
    title: 'Baby Doll Collection',
    description: 'Set of 3 dolls with clothes and accessories. My daughter has outgrown them.',
    price: 'Free',
    condition: 'good',
    category: 'Dolls & Action Figures',
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    location: 'Manhattan, NY',
    createdAt: new Date('2023-10-12'),
    updatedAt: new Date('2023-10-12'),
    userId: '2'
  },
  {
    id: '3',
    title: 'Wooden Train Set',
    description: 'Beautiful wooden train set with tracks, bridges, and buildings. A few small scratches but otherwise perfect.',
    price: 'Free',
    condition: 'good',
    category: 'Vehicles & RC',
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ],
    location: 'Queens, NY',
    createdAt: new Date('2023-10-10'),
    updatedAt: new Date('2023-10-10'),
    userId: '1'
  },
  {
    id: '4',
    title: 'Monopoly Board Game',
    description: 'Classic Monopoly game, complete with all pieces and money.',
    price: 'Free',
    condition: 'good',
    category: 'Board Games',
    images: [
      'https://images.unsplash.com/photo-1611371805429-8b5c1f0536a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    location: 'Bronx, NY',
    createdAt: new Date('2023-10-08'),
    updatedAt: new Date('2023-10-08'),
    userId: '2'
  },
  {
    id: '5',
    title: 'Remote Control Car',
    description: 'Fast RC car with rechargeable battery. Great condition, barely used.',
    price: 'Free',
    condition: 'like-new',
    category: 'Vehicles & RC',
    images: [
      'https://images.unsplash.com/photo-1584641911870-6196a92c1920?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    location: 'Staten Island, NY',
    createdAt: new Date('2023-10-05'),
    updatedAt: new Date('2023-10-05'),
    userId: '1'
  }
];

export const AdsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ads, setAds] = useState<ToyAd[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize with mock data
  useEffect(() => {
    const storedAds = localStorage.getItem('toyAds');
    if (storedAds) {
      const parsedAds = JSON.parse(storedAds);
      // Convert string dates back to Date objects
      const adsWithDates = parsedAds.map((ad: any) => ({
        ...ad,
        createdAt: new Date(ad.createdAt),
        updatedAt: new Date(ad.updatedAt),
      }));
      setAds(adsWithDates);
    } else {
      setAds(MOCK_ADS);
      localStorage.setItem('toyAds', JSON.stringify(MOCK_ADS));
    }
    setLoading(false);
  }, []);

  // Get featured ads (for homepage)
  const featuredAds = ads.slice(0, 3);

  // Get ads by user ID
  const getUserAds = (userId: string) => {
    return ads.filter(ad => ad.userId === userId);
  };

  // Get ad by ID
  const getAdById = (id: string) => {
    return ads.find(ad => ad.id === id);
  };

  // Create new ad
  const createAd = async (adData: Omit<ToyAd, 'id' | 'createdAt' | 'updatedAt'>) => {
    // In a real app, this would be an API call
    const newAd: ToyAd = {
      ...adData,
      id: `ad-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedAds = [...ads, newAd];
    setAds(updatedAds);
    localStorage.setItem('toyAds', JSON.stringify(updatedAds));
    return newAd;
  };

  // Update existing ad
  const updateAd = async (id: string, adData: Partial<ToyAd>) => {
    const existingAdIndex = ads.findIndex(ad => ad.id === id);
    
    if (existingAdIndex === -1) {
      throw new Error('Ad not found');
    }

    const updatedAd = {
      ...ads[existingAdIndex],
      ...adData,
      updatedAt: new Date(),
    };

    const updatedAds = [...ads];
    updatedAds[existingAdIndex] = updatedAd;

    setAds(updatedAds);
    localStorage.setItem('toyAds', JSON.stringify(updatedAds));
    return updatedAd;
  };

  // Delete ad
  const deleteAd = async (id: string) => {
    const updatedAds = ads.filter(ad => ad.id !== id);
    setAds(updatedAds);
    localStorage.setItem('toyAds', JSON.stringify(updatedAds));
  };

  return (
    <AdsContext.Provider value={{
      ads,
      featuredAds,
      loading,
      getUserAds,
      createAd,
      getAdById,
      updateAd,
      deleteAd
    }}>
      {children}
    </AdsContext.Provider>
  );
};

export const useAds = () => {
  const context = useContext(AdsContext);
  if (context === undefined) {
    throw new Error('useAds must be used within an AdsProvider');
  }
  return context;
};
