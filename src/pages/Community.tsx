
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Users, ThumbsUp, Globe, MapPin, Calendar, Star } from 'lucide-react';
import { toast } from 'sonner';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  content: string;
  location: string;
  timestamp: Date;
  likes: number;
  comments: number;
  liked: boolean;
  image?: string;
}

const Community = () => {
  const [activeFeed, setActiveFeed] = useState<string>('trending');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        isVerified: true,
      },
      content: 'Just discovered this amazing hidden beach in Bali! The locals call it "Secret Paradise". Go early in the morning to avoid crowds.',
      location: 'Bali, Indonesia',
      timestamp: new Date('2025-05-02T14:30:00'),
      likes: 124,
      comments: 28,
      liked: false,
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21'
    },
    {
      id: '2',
      author: {
        name: 'Michael Wong',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        isVerified: true,
      },
      content: "Best coffee shop in Tokyo! If you're a coffee enthusiast, you must visit \"Streamer Coffee\" in Shibuya. Their latte art is insane and the atmosphere is perfect for remote work.",
      location: 'Tokyo, Japan',
      timestamp: new Date('2025-05-03T09:15:00'),
      likes: 87,
      comments: 15,
      liked: false,
      image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833'
    },
    {
      id: '3',
      author: {
        name: 'Emma Davis',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        isVerified: false,
      },
      content: "Travel hack: If you're visiting multiple museums in Barcelona, get the Barcelona Card. Saved me over €50 and comes with free public transport!",
      location: 'Barcelona, Spain',
      timestamp: new Date('2025-05-03T16:45:00'),
      likes: 214,
      comments: 32,
      liked: false
    }
  ]);

  const [newPostContent, setNewPostContent] = useState('');

  const handleToggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const wasLiked = post.liked;
        return {
          ...post,
          liked: !wasLiked,
          likes: wasLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostContent.trim()) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
        isVerified: false,
      },
      content: newPostContent,
      location: 'Your Location',
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      liked: false
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    toast.success('Your post has been shared with the community!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-6 px-6 md:px-10 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <Users className="mr-2 text-airbnb-pink" />
            Traveler Community
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Hub</CardTitle>
                  <CardDescription>Connect with fellow travelers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                    <Globe className="h-5 w-5 text-gray-500" />
                    <span>Explore Destinations</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span>Travel Buddies</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                    <Star className="h-5 w-5 text-gray-500" />
                    <span>Local Experts</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span>Upcoming Events</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Popular Destinations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
                    <MapPin className="h-4 w-4 text-airbnb-pink" />
                    <span>Tokyo, Japan</span>
                    <span className="text-xs text-gray-500 ml-auto">214 posts</span>
                  </div>
                  <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
                    <MapPin className="h-4 w-4 text-airbnb-pink" />
                    <span>Bali, Indonesia</span>
                    <span className="text-xs text-gray-500 ml-auto">189 posts</span>
                  </div>
                  <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
                    <MapPin className="h-4 w-4 text-airbnb-pink" />
                    <span>Barcelona, Spain</span>
                    <span className="text-xs text-gray-500 ml-auto">167 posts</span>
                  </div>
                  <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
                    <MapPin className="h-4 w-4 text-airbnb-pink" />
                    <span>New York, USA</span>
                    <span className="text-xs text-gray-500 ml-auto">142 posts</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-2 space-y-6">
              {/* Post creation */}
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleAddPost}>
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" 
                          alt="Your avatar" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-grow">
                        <Input
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          placeholder="Share a travel tip or ask the community for advice..."
                          className="mb-3"
                        />
                        <div className="flex justify-between">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" type="button">Add Photo</Button>
                            <Button variant="outline" size="sm" type="button">Tag Location</Button>
                          </div>
                          <Button type="submit" disabled={!newPostContent.trim()}>Share</Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              {/* Feed tabs */}
              <Tabs defaultValue="trending" onValueChange={setActiveFeed}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
                
                <TabsContent value="trending" className="space-y-6">
                  {posts.map(post => (
                    <Card key={post.id}>
                      <CardContent className="pt-6 space-y-4">
                        {/* Post header */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img 
                              src={post.author.avatar} 
                              alt={post.author.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium">{post.author.name}</span>
                              {post.author.isVerified && (
                                <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded">Verified</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {post.location} • {new Date(post.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        
                        {/* Post content */}
                        <p>{post.content}</p>
                        
                        {/* Post image if available */}
                        {post.image && (
                          <div className="rounded-md overflow-hidden">
                            <img src={post.image} alt="Post" className="w-full h-auto" />
                          </div>
                        )}
                        
                        {/* Post actions */}
                        <div className="flex gap-4 pt-2">
                          <button 
                            className={`flex items-center gap-1 ${post.liked ? 'text-airbnb-pink' : 'text-gray-600'}`}
                            onClick={() => handleToggleLike(post.id)}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-600">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="recent">
                  <div className="text-center py-10">
                    <p>The recent posts feed works the same way, but would be sorted by date.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="following">
                  <div className="text-center py-10">
                    <p>Follow other travelers to see their posts here.</p>
                    <Button className="mt-4">Find travelers to follow</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
