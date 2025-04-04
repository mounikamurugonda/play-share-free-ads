
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin } from 'lucide-react';
import { ToyAd } from '@/types';

interface ToyCardProps {
  ad: ToyAd;
  hideUser?: boolean;
}

const ToyCard: React.FC<ToyCardProps> = ({ ad, hideUser = false }) => {
  const { id, title, price, condition, category, images, location, user } = ad;
  
  const conditionColor = {
    'new': 'bg-green-100 text-green-800',
    'like-new': 'bg-blue-100 text-blue-800',
    'good': 'bg-yellow-100 text-yellow-800',
    'fair': 'bg-orange-100 text-orange-800',
    'poor': 'bg-red-100 text-red-800'
  }[condition];

  return (
    <Card className="toy-card overflow-hidden hover:scale-[1.02] transition duration-300">
      <Link to={`/ad/${id}`}>
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={images[0]} 
            alt={title}
            className="object-cover w-full h-full"
          />
          {price === 'Free' && (
            <Badge className="absolute top-2 right-2 bg-toy-orange text-white">
              Free
            </Badge>
          )}
        </div>
      </Link>

      <CardHeader className="py-3">
        <Link to={`/ad/${id}`} className="font-medium hover:underline text-lg line-clamp-1">
          {title}
        </Link>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`${conditionColor} border-none text-xs`}>
            {condition.replace('-', ' ')}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardFooter className="py-2 pt-0 flex justify-between items-center">
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{location}</span>
        </div>

        {!hideUser && user && (
          <div className="flex items-center">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ToyCard;
