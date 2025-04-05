
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LoginPrompt = () => {
  const navigate = useNavigate();
  
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
};

export default LoginPrompt;
