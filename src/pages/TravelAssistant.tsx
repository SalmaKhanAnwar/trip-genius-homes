
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, Send, ThumbsUp, User, Map, CalendarDays } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const TravelAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI travel assistant. How can I help plan your next trip?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      let response = "";
      
      if (input.toLowerCase().includes('beach') || input.toLowerCase().includes('ocean')) {
        response = "I can help you find beautiful beach destinations! Would you prefer tropical islands like Bali or Maldives, or coastal cities like Miami or Barcelona?";
      } else if (input.toLowerCase().includes('mountain') || input.toLowerCase().includes('hiking')) {
        response = "Mountain getaways are amazing! I can recommend places like the Swiss Alps, Rocky Mountains in Colorado, or Patagonia in Argentina. What kind of activities are you interested in?";
      } else if (input.toLowerCase().includes('budget')) {
        response = "I understand you're looking for budget-friendly options. I can help you find affordable accommodations and suggest free or low-cost activities. Which destination are you considering?";
      } else if (input.toLowerCase().includes('family')) {
        response = "Family trips need special planning! Would you like kid-friendly resorts, activities for various ages, or destinations that have something for everyone?";
      } else {
        response = "That sounds like an exciting trip idea! To help you better, could you share more details about your preferred destination, budget, or what kind of experience you're looking for?";
      }
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      toast.success("New travel suggestion available!");
    }, 1500);
  };

  const getSuggestedQueries = () => [
    "Help me plan a beach vacation",
    "I want to go hiking in the mountains",
    "Find me budget-friendly destinations in Europe",
    "Plan a family-friendly trip for 4 people",
    "What are good places for remote work?"
  ];

  const handleSuggestedQuery = (query: string) => {
    setInput(query);
    // Focus on input after setting
    document.getElementById('message-input')?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row gap-6 py-6 px-6 md:px-10 lg:px-20">
        {/* Left sidebar */}
        <div className="md:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Compass className="mr-2 text-airbnb-pink" />
                Trip Planner
              </CardTitle>
              <CardDescription>
                Plan your perfect getaway with AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Map className="h-5 w-5 mr-2 text-gray-500" />
                  <span>Destination Research</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-gray-500" />
                  <span>Itinerary Planning</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-gray-500" />
                  <span>Local Experiences</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => handleSuggestedQuery("Help me plan a trip to Bali")}>
                  <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" alt="Bali" className="w-10 h-10 object-cover rounded-full mr-2" />
                  <span>Bali, Indonesia</span>
                </div>
                <div className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => handleSuggestedQuery("Tell me about trips to Barcelona")}>
                  <img src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843" alt="Barcelona" className="w-10 h-10 object-cover rounded-full mr-2" />
                  <span>Barcelona, Spain</span>
                </div>
                <div className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => handleSuggestedQuery("I want to visit Tokyo")}>
                  <img src="https://images.unsplash.com/photo-1496307653780-42ee777d4833" alt="Tokyo" className="w-10 h-10 object-cover rounded-full mr-2" />
                  <span>Tokyo, Japan</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat area - main content */}
        <Card className="md:w-3/4 flex flex-col">
          <CardHeader className="border-b">
            <CardTitle>AI Travel Concierge</CardTitle>
            <CardDescription>
              Ask me anything about travel recommendations, planning, or local insights
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-grow overflow-y-auto max-h-[60vh]">
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-airbnb-pink text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <div className="px-4 py-2 bg-gray-50 rounded-md mx-4 mb-2">
            <div className="flex flex-wrap gap-2 mb-2">
              {getSuggestedQueries().map((query, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSuggestedQuery(query)}
                  className="text-xs"
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
          
          <CardFooter className="border-t pt-4">
            <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
              <Input
                id="message-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your next trip..."
                className="flex-grow"
              />
              <Button type="submit" size="icon" disabled={isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default TravelAssistant;
