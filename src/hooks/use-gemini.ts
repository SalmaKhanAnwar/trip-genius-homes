
import { useState } from 'react';
import { toast } from 'sonner';

export interface GeminiConfig {
  temperature?: number;
  topK?: number;
  topP?: number;
  maxOutputTokens?: number;
  apiKey: string;
}

interface GeminiResponse {
  text: string;
  loading: boolean;
  error: string | null;
}

export const useGemini = (defaultConfig?: Partial<GeminiConfig>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async (
    prompt: string, 
    config: Partial<GeminiConfig> = {}
  ): Promise<GeminiResponse> => {
    if (!config.apiKey && !defaultConfig?.apiKey) {
      const errorMsg = "No API key provided";
      setError(errorMsg);
      return {
        text: '',
        loading: false,
        error: errorMsg
      };
    }

    const apiKey = config.apiKey || defaultConfig?.apiKey;
    setLoading(true);
    setError(null);

    try {
      // Updated to use the correct API endpoint
      const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey as string,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: config.temperature ?? defaultConfig?.temperature ?? 0.7,
            topK: config.topK ?? defaultConfig?.topK ?? 40,
            topP: config.topP ?? defaultConfig?.topP ?? 0.95,
            maxOutputTokens: config.maxOutputTokens ?? defaultConfig?.maxOutputTokens ?? 800,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;

      return {
        text: generatedText,
        loading: false,
        error: null
      };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to generate content";
      setError(errorMessage);
      
      return {
        text: '',
        loading: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    generateContent,
    loading,
    error,
  };
};
