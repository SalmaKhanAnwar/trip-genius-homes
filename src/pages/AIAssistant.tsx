
import React, { useState } from 'react';
import { Send, Compass, Map, Calendar, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Suggestion {
  id: string;
  text: string;
  icon: React.ElementType;
}

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Travel Assistant. How can I help plan your perfect trip today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const suggestions: Suggestion[] = [
    { id: '1', text: 'Plan a week in Paris', icon: Compass },
    { id: '2', text: 'Find remote work friendly stays in Bali', icon: Map },
    { id: '3', text: 'Create an itinerary for a family vacation', icon: Calendar },
    { id: '4', text: 'Recommend weekend getaways near me', icon: Clock },
  ];

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message
    const userMessageId = `user-${Date.now()}`;
    const userMessage: Message = {
      id: userMessageId,
      text: message,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        text: getAIResponse(message),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  
  const getAIResponse = (userMessage: string) => {
    const lowercase = userMessage.toLowerCase();
    
    if (lowercase.includes('paris')) {
      return "Great choice! Paris is beautiful in the spring. I recommend staying in Le Marais district for its central location and charm. Would you like me to suggest some properties and activities for your Paris trip?";
    } else if (lowercase.includes('bali') || lowercase.includes('remote work')) {
      return "Bali is a remote work paradise! The best areas for digital nomads are Canggu and Ubud. Both have excellent wifi, co-working spaces, and a community of remote workers. Would you like to see some remote-work friendly properties in these areas?";
    } else if (lowercase.includes('family') || lowercase.includes('vacation')) {
      return "Family vacations are special! I recommend properties with kid-friendly amenities. Would you prefer a beach destination, a mountain retreat, or a city with family attractions?";
    } else if (lowercase.includes('weekend') || lowercase.includes('getaway')) {
      return "Looking for a weekend escape? Great idea! If you share your current location, I can recommend some amazing properties within a 2-3 hour drive that have availability this coming weekend.";
    } else {
      return "I'd be happy to help plan your trip! Could you tell me more about your destination preferences, travel dates, and what kind of experience you're looking for?";
    }
  };
  
  const handleSuggestionClick = (suggestion: Suggestion) => {
    setMessage(suggestion.text);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col p-6 md:p-10 lg:p-20">
        <h1 className="text-2xl font-bold mb-6">AI Travel Assistant</h1>
        
        <Card className="flex-grow mb-4">
          <CardContent className="p-4 h-[60vh] overflow-y-auto flex flex-col">
            <div className="flex-grow space-y-4">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.isUser 
                        ? 'bg-airbnb-pink text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
          {suggestions.map(suggestion => (
            <Button 
              key={suggestion.id} 
              variant="outline"
              className="flex items-center justify-start text-left h-auto py-2"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <suggestion.icon className="h-4 w-4 mr-2 text-airbnb-pink" />
              <span className="truncate">{suggestion.text}</span>
            </Button>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <Input 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about your trip..." 
            className="flex-grow"
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
            <span className="ml-2">Send</span>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIAssistant;
