
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryIconProps {
  id: string;
  name: string;
  icon: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ id, name, icon }) => {
  return (
    <Link 
      to={`/browse?category=${id}`} 
      className="flex flex-col items-center space-y-2 group"
    >
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-toy-blue/10 to-toy-green/10 group-hover:from-toy-blue/20 group-hover:to-toy-green/20 transition-all duration-300">
        <span className="text-2xl">{icon}</span>
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-toy-blue transition-colors">
        {name}
      </span>
    </Link>
  );
};

export default CategoryIcon;
