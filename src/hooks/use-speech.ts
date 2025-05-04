
import { useState, useEffect, useRef } from 'react';

interface SpeechRecognitionHook {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  toggleListening: () => void;
  resetTranscript: () => void;
  isSupported: boolean;
  error: string | null;
}

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if the Web Speech API is available
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map(result => result.transcript)
          .join('');
          
        setTranscript(transcript);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        setError(event.error);
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };
      
      setIsSupported(true);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const startListening = () => {
    setError(null);
    if (!isSupported) {
      setError("Speech recognition is not supported in this browser");
      return;
    }
    
    try {
      recognitionRef.current?.start();
      setIsListening(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    toggleListening,
    resetTranscript,
    isSupported,
    error,
  };
};

interface SpeechSynthesisHook {
  speak: (text: string) => void;
  stop: () => void;
  isSupported: boolean;
  isSpeaking: boolean;
  error: string | null;
}

export const useSpeechSynthesis = (): SpeechSynthesisHook => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      
      // Update speaking state when synthesis state changes
      const handleSpeakingChange = () => {
        setIsSpeaking(window.speechSynthesis.speaking);
      };
      
      window.speechSynthesis.addEventListener('voiceschanged', handleSpeakingChange);
      
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', handleSpeakingChange);
      };
    }
  }, []);

  const speak = (text: string) => {
    setError(null);
    if (!isSupported) {
      setError("Speech synthesis is not supported in this browser");
      return;
    }
    
    try {
      // Cancel any ongoing speech
      stop();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (event) => setError(event.error);
      
      window.speechSynthesis.speak(utterance);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const stop = () => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return {
    speak,
    stop,
    isSupported,
    isSpeaking,
    error,
  };
};
