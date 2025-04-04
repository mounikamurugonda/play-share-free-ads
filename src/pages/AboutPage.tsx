
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      
      <div className="bg-gradient-to-b from-blue-50 to-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-toy-blue">ToyShare</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            A community-driven platform dedicated to giving toys a second life.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <div className="prose max-w-none">
                <p>
                  At ToyShare, our mission is simple: to connect families who have toys they no longer need
                  with those who would cherish them. We believe that every toy deserves a loving home,
                  and every child deserves the joy of play.
                </p>
                <p>
                  As parents, we understand that children outgrow toys quickly. Rather than letting these
                  toys collect dust or end up in landfills, ToyShare provides a platform for them to bring
                  happiness to another child.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                <Card className="p-6 text-center bg-blue-50 border-none">
                  <div className="text-3xl mb-4">📸</div>
                  <h3 className="text-lg font-semibold mb-2">Post Your Toys</h3>
                  <p className="text-gray-600">
                    Take photos and create a simple listing for toys your children have outgrown.
                  </p>
                </Card>
                
                <Card className="p-6 text-center bg-green-50 border-none">
                  <div className="text-3xl mb-4">💬</div>
                  <h3 className="text-lg font-semibold mb-2">Connect</h3>
                  <p className="text-gray-600">
                    Message other families interested in your toys and arrange pickup.
                  </p>
                </Card>
                
                <Card className="p-6 text-center bg-orange-50 border-none">
                  <div className="text-3xl mb-4">🎁</div>
                  <h3 className="text-lg font-semibold mb-2">Share Joy</h3>
                  <p className="text-gray-600">
                    Give your toys a second life and help make other children happy.
                  </p>
                </Card>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Our Commitment to Free Sharing</h2>
              <div className="prose max-w-none">
                <p>
                  ToyShare is committed to being a 100% free platform. There are no fees, no premium listings,
                  and no hidden costs. We believe in the power of community and generosity.
                </p>
                <p>
                  Our platform is designed to foster a spirit of giving, reduce waste, and create
                  connections between families in your local community.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Community Guidelines</h2>
              <div className="prose max-w-none">
                <p>
                  To ensure ToyShare remains a safe, welcoming space for all families, we ask members to follow these guidelines:
                </p>
                <ul>
                  <li>Be honest about a toy's condition</li>
                  <li>Respond to messages promptly</li>
                  <li>Show up for scheduled exchanges</li>
                  <li>Treat other members with respect and kindness</li>
                  <li>Only list toys that are safe and appropriate for children</li>
                </ul>
                <p>
                  Our volunteer moderators work hard to maintain these standards and keep ToyShare
                  a positive experience for everyone.
                </p>
              </div>
            </section>
            
            <section className="bg-blue-50 p-8 rounded-xl text-center">
              <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
              <p className="mb-6">
                Ready to start sharing toys and spreading joy?
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  className="bg-toy-blue hover:bg-toy-blue/90"
                  asChild
                >
                  <Link to="/signup">Sign Up Now</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-toy-blue text-toy-blue hover:bg-toy-blue/10"
                  asChild
                >
                  <Link to="/browse">Browse Toys</Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AboutPage;
