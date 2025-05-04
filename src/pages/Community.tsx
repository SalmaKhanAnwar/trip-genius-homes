
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Heart, Share2, MapPin, ThumbsUp, Users, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  content: string;
  location: string;
  timestamp: Date;
  likes: number;
  comments: number;
  tags?: string[];
}

const Community = () => {
  const [activeTab, setActiveTab] = useState('nearby');
  const [newPost, setNewPost] = useState('');
  
  // Sample data for community posts
  const posts: Post[] = [
    {
      id: '1',
      user: {
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
        isVerified: true,
      },
      content: 'Just discovered an amazing hidden beach in Bali! Anyone staying near Uluwatu should definitely check out Nyang Nyang Beach. The trek down is worth it!',
      location: 'Bali, Indonesia',
      timestamp: new Date('2025-05-04T15:30:00'),
      likes: 24,
      comments: 7,
      tags: ['beach', 'hidden-gem', 'bali']
    },
    {
      id: '2',
      user: {
        name: 'Sophia Lin',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        isVerified: true,
      },
      content: 'Best coffee shop in Tokyo! If you\'re a coffee enthusiast, you must visit "Streamer Coffee" in Shibuya. Their latte art is insane and the atmosphere is perfect for remote work.',
      location: 'Tokyo, Japan',
      timestamp: new Date('2025-05-03T09:15:00'),
      likes: 18,
      comments: 5,
      tags: ['coffee', 'digital-nomad', 'tokyo']
    },
    {
      id: '3',
      user: {
        name: 'Marcus Johnson',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
        isVerified: false,
      },
      content: 'Looking for recommendations for family-friendly activities in Barcelona! We\'re staying for a week in June with two kids (8 and 11). Any suggestions?',
      location: 'Barcelona, Spain',
      timestamp: new Date('2025-05-02T11:45:00'),
      likes: 7,
      comments: 12,
      tags: ['family', 'activities', 'barcelona']
    }
  ];

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim() === '') return;
    
    // In a real app, you would send this to an API
    toast.success('Your post has been shared with the community!');
    setNewPost('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 px-6 md:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Traveler Community</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left sidebar */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Community Hub</CardTitle>
                  <CardDescription>Connect with fellow travelers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-airbnb-pink" />
                    <span>12,547 Active Members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-airbnb-pink" />
                    <span>178 Countries Represented</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-airbnb-pink" />
                    <span>2,354 Topics Discussed</span>
                  </div>
                  
                  <hr className="my-4" />
                  
                  <h3 className="font-medium">Popular Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">#digitalnomad</Button>
                    <Button variant="outline" size="sm">#familytravel</Button>
                    <Button variant="outline" size="sm">#budgettips</Button>
                    <Button variant="outline" size="sm">#localcuisine</Button>
                    <Button variant="outline" size="sm">#sustainabletravel</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Share with the Community</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmitPost}>
                  <CardContent>
                    <Textarea 
                      placeholder="Share travel tips, ask questions, or connect with other travelers..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      rows={3}
                      className="mb-2"
                    />
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Add your location</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex space-x-2">
                      <Button type="button" variant="outline" size="sm">
                        Add Photo
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        Tag Topic
                      </Button>
                    </div>
                    <Button type="submit">
                      Share
                    </Button>
                  </CardFooter>
                </form>
              </Card>
              
              <div className="mb-6">
                <Tabs defaultValue="nearby" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="nearby">Nearby</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="space-y-4">
                {posts.map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={post.user.avatar} alt={post.user.name} />
                          <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">{post.user.name}</span>
                            {post.user.isVerified && (
                              <span className="ml-1 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{post.location}</span>
                            <span className="mx-1">•</span>
                            <span>{post.timestamp.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="mb-3">{post.content}</p>
                      
                      {post.tags && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-2 text-sm text-gray-500 border-t">
                        <div className="flex space-x-4">
                          <button className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </button>
                        </div>
                        <button className="flex items-center space-x-1">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
