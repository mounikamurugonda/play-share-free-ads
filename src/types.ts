
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location?: string;
  bio?: string;
  rating?: number;
  role: 'user' | 'moderator' | 'admin';
}

export interface ToyAd {
  id: string;
  title: string;
  description: string;
  price: string; // Using string to represent "Free" or "$10" etc.
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  category: string;
  images: string[];
  location: string;
  coordinates?: { lat: number; lng: number };
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  adId: string;
  createdAt: Date;
  read: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
