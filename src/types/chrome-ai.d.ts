// src/types/chrome-ai.d.ts
interface Window {
  ai: {
    detectLanguage: (text: string) => Promise<{ languageCode: string }>;
    summarize: (text: string) => Promise<{ summary: string }>;
    translate: (
      text: string,
      options: { targetLang: string }
    ) => Promise<{ translation: string }>;
  };
}
