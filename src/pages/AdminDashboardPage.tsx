
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  Flag,
  LayoutDashboard,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useAds } from '@/context/AdsContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const { ads } = useAds();
  const navigate = useNavigate();
  
  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-16 px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-4xl mb-4">🛑</div>
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-gray-500 mb-6">
              You don't have permission to view this page. Only administrators can access the dashboard.
            </p>
            <Button 
              className="bg-toy-blue hover:bg-toy-blue/90"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Badge variant="outline" className="border-toy-blue text-toy-blue px-3 py-1 text-xs">
            Admin Role
          </Badge>
        </div>
        
        {/* Dashboard overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Listings</p>
                <h3 className="text-3xl font-bold">{ads.length}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <LayoutDashboard className="text-toy-blue h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Users</p>
                <h3 className="text-3xl font-bold">12</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="text-toy-green h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Reported Ads</p>
                <h3 className="text-3xl font-bold">2</h3>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <Flag className="text-red-500 h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Moderators</p>
                <h3 className="text-3xl font-bold">3</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <ShieldAlert className="text-purple-500 h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main dashboard content */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="ads">Ad Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Activity</CardTitle>
                  <CardDescription>
                    Recent activity across the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                      <Avatar>
                        <AvatarImage src="https://randomuser.me/api/portraits/women/1.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">New user registered</p>
                        <p className="text-sm text-gray-500">Sarah Johnson created an account</p>
                      </div>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                      <div className="bg-blue-100 p-2 rounded-full text-toy-blue">
                        <LayoutDashboard className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">New toy listing</p>
                        <p className="text-sm text-gray-500">Wooden Train Set was posted by John Doe</p>
                      </div>
                      <p className="text-sm text-gray-500">5 hours ago</p>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                      <div className="bg-red-100 p-2 rounded-full text-red-500">
                        <Flag className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Listing reported</p>
                        <p className="text-sm text-gray-500">A listing was reported for inappropriate content</p>
                      </div>
                      <p className="text-sm text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Categories</CardTitle>
                    <CardDescription>
                      Most active toy categories this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 text-center text-lg">🧩</div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">Puzzles</span>
                            <span className="text-sm text-gray-500">32%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-toy-blue h-2 rounded-full" style={{ width: '32%' }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-12 text-center text-lg">🧸</div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">Stuffed Animals</span>
                            <span className="text-sm text-gray-500">28%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-toy-blue h-2 rounded-full" style={{ width: '28%' }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-12 text-center text-lg">🧱</div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">Building Blocks</span>
                            <span className="text-sm text-gray-500">24%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-toy-blue h-2 rounded-full" style={{ width: '24%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>
                      New user signups per week
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-6">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="h-16 w-16 mx-auto mb-2" />
                      <p>Analytics charts coming in future update</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage platform users and their permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Detailed user management features coming in future update
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ads">
            <Card>
              <CardHeader>
                <CardTitle>Ad Moderation</CardTitle>
                <CardDescription>
                  Review and moderate user-submitted listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Detailed ad moderation features coming in future update
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Platform growth and user engagement metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Detailed analytics features coming in future update
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </>
  );
};

export default AdminDashboardPage;
