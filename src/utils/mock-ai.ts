// src/utils/mock-ai.ts (updated)
export const mockAI = {
  detectLanguage: async (text: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { languageCode: text.toLowerCase().includes("hola") ? "es" : "en" };
  },
  summarize: async (text: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { summary: `[Mock Summary] ${text.slice(0, 100)}...` };
  },
  translate: async (text: string, options: { targetLang: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      translation: `[Mock] Translated to ${options.targetLang}: ${text}`,
    };
  },
};
