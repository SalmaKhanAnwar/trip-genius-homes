
import React, { useState, useRef, useEffect } from 'react';
import { Send, Compass, Map, Calendar, Clock, Mic, MicOff, Bot, Volume } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useGemini } from '@/hooks/use-gemini';
import { useSpeechRecognition, useSpeechSynthesis } from '@/hooks/use-speech';

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
      text: 'Hello! I\'m your AI Travel Assistant powered by Gemini. How can I help plan your perfect trip today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Custom hooks
  const { generateContent, loading: isProcessing } = useGemini({ apiKey: isApiKeySet ? apiKey : '' });
  const { transcript, isListening, toggleListening, resetTranscript, isSupported: speechRecognitionSupported } = useSpeechRecognition();
  const { speak, isSupported: speechSynthesisSupported } = useSpeechSynthesis();

  const suggestions: Suggestion[] = [
    { id: '1', text: 'Plan a week in Paris', icon: Compass },
    { id: '2', text: 'Find remote work friendly stays in Bali', icon: Map },
    { id: '3', text: 'Create an itinerary for a family vacation', icon: Calendar },
    { id: '4', text: 'Recommend weekend getaways near me', icon: Clock },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    if (!isApiKeySet) {
      toast.error("Please enter your Gemini API key first");
      return;
    }
    
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
    resetTranscript();
    
    try {
      // Prepare the prompt with context
      const prompt = `You are an AI travel assistant for a vacation rental platform similar to Airbnb. Help users plan trips, suggest destinations, and provide travel advice. 
      
      Respond to the following request from a user in a helpful, conversational tone: "${message}"`;

      // Call to Gemini API
      const response = await generateContent(prompt);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        text: response.text,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // If voice mode is enabled, speak the response
      if (voiceMode && speechSynthesisSupported) {
        speak(response.text);
      }
    } catch (error: any) {
      console.error("Error fetching response from Gemini:", error);
      toast.error("Failed to get a response. Please try again.");
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Sorry, I couldn't process your request. Please try again.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };
  
  const handleSuggestionClick = (suggestion: Suggestion) => {
    setMessage(suggestion.text);
  };

  const handleSetApiKey = () => {
    if (apiKey.trim() !== '') {
      setIsApiKeySet(true);
      toast.success("API key saved! You can now use the assistant.");
    } else {
      toast.error("Please enter a valid Gemini API key");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col p-6 md:p-10 lg:p-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">AI Travel Assistant <span className="text-airbnb-pink">(Gemini powered)</span></h1>
          <div className="flex items-center space-x-2">
            {speechRecognitionSupported && (
              <Button 
                variant="outline"
                size="sm"
                onClick={toggleListening}
                className={`${isListening ? 'bg-airbnb-pink text-white' : ''}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop Listening' : 'Start Listening'}
              </Button>
            )}
            
            {speechSynthesisSupported && (
              <div className="flex items-center space-x-2">
                <Switch 
                  id="voice-mode" 
                  checked={voiceMode} 
                  onCheckedChange={setVoiceMode} 
                />
                <Label htmlFor="voice-mode" className="cursor-pointer flex items-center">
                  <Volume className="h-4 w-4 mr-1" />
                  Voice Response
                </Label>
              </div>
            )}
          </div>
        </div>
        
        {!isApiKeySet && (
          <Card className="mb-4 border-amber-300">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-2">
                <p className="text-amber-600 flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  Please enter your Gemini API key to activate the AI assistant
                </p>
                <div className="flex space-x-2">
                  <Input 
                    type="password"
                    placeholder="Enter Gemini API key" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={handleSetApiKey}>
                    Save Key
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Your API key is stored only in your browser's memory and will be lost when you refresh the page.
                  For better security, consider using Supabase integration to store your API key securely.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
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
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
                    <div className="flex space-x-2">
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
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
          {suggestions.map(suggestion => (
            <Button 
              key={suggestion.id} 
              variant="outline"
              className="flex items-center justify-start text-left h-auto py-2"
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isProcessing || !isApiKeySet}
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
            onKeyPress={(e) => e.key === 'Enter' && !isProcessing && handleSendMessage()}
            placeholder="Ask me anything about your trip..." 
            className="flex-grow"
            disabled={isProcessing || !isApiKeySet}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isProcessing || !isApiKeySet}
          >
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
